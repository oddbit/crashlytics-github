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
exports.updateRegression = exports.updateVelocityAlert = exports.createNewGithubIssue = void 0;
const functions = require("firebase-functions");
const config_1 = require("./config");
const githubApi = require("./github-api");
const issue_model_1 = require("./issue.model");
exports.createNewGithubIssue = functions.handler.crashlytics.issue.onNew(crashlyticsIssue => {
    console.log(JSON.stringify(crashlyticsIssue));
    return githubApi.createIssue(issue_model_1.GithubIssue.fromCrashlyticsIssue(crashlyticsIssue));
});
exports.updateVelocityAlert = functions.handler.crashlytics.issue.onVelocityAlert(async (crashlyticsIssue) => {
    const githubIssue = await githubApi.findIssue(crashlyticsIssue);
    if (!githubIssue) {
        console.log(`Could not find any Github issue matching ${crashlyticsIssue.issueId}`);
        const newIssue = issue_model_1.GithubIssue.fromCrashlyticsIssue(crashlyticsIssue);
        newIssue.labels.push(...config_1.default.githubLabelsVelocity);
        return githubApi.createIssue(newIssue);
    }
    const velocityAlertIssue = new issue_model_1.GithubIssue(githubIssue);
    velocityAlertIssue.updateWithCrashlyticsIssue(crashlyticsIssue);
    velocityAlertIssue.labels.push(...config_1.default.githubLabelsVelocity);
    return Promise.all([
        githubApi.updateIssue(velocityAlertIssue),
        githubApi.commentVelocityReport(githubIssue, velocityAlertIssue),
    ]);
});
exports.updateRegression = functions.handler.crashlytics.issue.onRegressed(async (crashlyticsIssue) => {
    const githubIssue = await githubApi.findIssue(crashlyticsIssue);
    if (!githubIssue) {
        console.log(`Could not find any Github issue matching ${crashlyticsIssue.issueId}`);
        const newIssue = issue_model_1.GithubIssue.fromCrashlyticsIssue(crashlyticsIssue);
        newIssue.labels.push(...config_1.default.githubLabelsRegressed);
        return githubApi.createIssue(newIssue);
    }
    const regressedIssue = new issue_model_1.GithubIssue(githubIssue);
    regressedIssue.updateWithCrashlyticsIssue(crashlyticsIssue);
    regressedIssue.labels.push(...config_1.default.githubLabelsRegressed);
    return Promise.all([
        githubApi.updateIssue(regressedIssue),
        githubApi.commentRegression(githubIssue, regressedIssue),
    ]);
});
//# sourceMappingURL=index.js.map