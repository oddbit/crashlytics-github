"use strict";
/*
 * Copyright Oddbit
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentVelocityReport = exports.updateIssue = exports.createIssue = exports.findIssue = void 0;
const rp = require("request-promise");
const config_1 = require("./config");
const issue_model_1 = require("./issue.model");
function callApi(method, endPoint, payload) {
    return rp({
        auth: {
            user: config_1.default.githubApiUser,
            pass: config_1.default.githubAccessToken,
        },
        method: method,
        uri: `https://api.github.com/repos/${config_1.default.githubRepository}/${endPoint}`,
        body: payload,
        json: true,
        headers: { 'user-agent': 'oddbit/crashlytics-integration' },
    });
}
async function findIssue(crashlyticsIssue) {
    console.log(`[findIssue] Find issue" ${crashlyticsIssue.issueId}`);
    const queryParams = { since: crashlyticsIssue.createTime };
    const responseIssues = (await callApi('GET', `issues`, queryParams)) || [];
    console.log(`Got ${responseIssues.length} issues since ${crashlyticsIssue.createTime}`);
    const matchingIssue = responseIssues
        .map((responseIssue) => issue_model_1.GithubIssue.fromGithubIssueResponse(responseIssue))
        .filter((githubIssue) => githubIssue.crashlyticsId === crashlyticsIssue.issueId)
        .pop();
    console.log(`[findIssue] Result: ${matchingIssue}`);
    return matchingIssue || null;
}
exports.findIssue = findIssue;
async function createIssue(githubIssue) {
    console.log(`[createIssue] ${githubIssue}`);
    const response = await callApi('POST', `issues`, githubIssue.toRequestJson());
    if (!response) {
        throw new Error('No response from Github API');
    }
    const createdGithubIssue = issue_model_1.GithubIssue.fromGithubIssueResponse(response);
    console.log(`[createIssue] ${createdGithubIssue}`);
    return createdGithubIssue;
}
exports.createIssue = createIssue;
function updateIssue(githubIssue) {
    if (!githubIssue.githubNumber) {
        throw new Error('Issue must already have a Github Issue number');
    }
    console.log(`[updateIssue] ${githubIssue}`);
    return callApi('PATCH', `issues/${githubIssue.githubNumber}`, githubIssue.toRequestJson());
}
exports.updateIssue = updateIssue;
function commentVelocityReport(issueBefore, issueAfter) {
    console.log(`[commentVelocityReport] ${issueBefore})}`);
    const comment = [
        `## Crashlytics Velocity Alert Report`,
        `| Crashes | Before | After |`,
        `|--------|---------|---------|`,
        `| Count |  ${issueBefore.numCrashesString} | ${issueAfter.numCrashesString} |`,
        `| Percent | ${issueBefore.crashPercentageString} | ${issueAfter.crashPercentageString} |`,
    ].join('\n');
    return callApi('POST', `issues/${issueBefore.githubNumber}/comments`, {
        body: comment,
    });
}
exports.commentVelocityReport = commentVelocityReport;
//# sourceMappingURL=github-api.js.map