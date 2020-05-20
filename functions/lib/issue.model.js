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
exports.GithubIssue = void 0;
const config_1 = require("./config");
const CRASHLYTICS_ID = '<!-- cgext_id -->';
const CRASHLYTICS_TITLE = '<!-- cgext_title -->';
const CREATE_TIME = '<!-- cgext_create_time -->';
const VELOCITY_PERCENT = '<!-- cgext_velocity_percent -->';
const VELOCITY_CRASHES = '<!-- cgext_velocity_crashes -->';
const APP_ID = '<!-- cgext_app_id -->';
const APP_NAME = '<!-- cgext_app_name -->';
const APP_PLATFORM = '<!-- cgext_app_platform -->';
const APP_VERSION = '<!-- cgext_app_version -->';
class GithubIssue {
    constructor(data) {
        var _a, _b;
        this.githubNumber = data.githubNumber;
        this.githubUrl = data.githubUrl;
        this.githubId = (_b = (_a = data.githubUrl) === null || _a === void 0 ? void 0 : _a.replace('https://github.com/', '')) === null || _b === void 0 ? void 0 : _b.replace('/issues', '');
        this.githubTitle = data.githubTitle;
        this.body = data.body;
        this.assignees = [...(data.assignees || [])];
        this.labels = [...(data.labels || [])];
        this.milestone = data.milestone;
        this.state = data.state;
    }
    get crashlyticsId() {
        return this.extractValue(CRASHLYTICS_ID) || '';
    }
    get crashlyticsTitle() {
        return this.extractValue(CRASHLYTICS_TITLE) || '';
    }
    get appId() {
        return this.extractValue(APP_ID) || '';
    }
    get appName() {
        return this.extractValue(APP_NAME) || '';
    }
    get appPlatform() {
        return this.extractValue(APP_PLATFORM) || '';
    }
    get issueCreated() {
        return this.extractValue(CREATE_TIME) || '';
    }
    set issueCreated(value) {
        this.replaceValue(CREATE_TIME, value);
    }
    get appVersion() {
        return this.extractValue(APP_VERSION) || '';
    }
    set appVersion(value) {
        this.replaceValue(APP_VERSION, value);
    }
    get numCrashes() {
        const numCrashes = this.extractValue(VELOCITY_CRASHES) || '?';
        const numCrashesNum = parseInt(numCrashes);
        return isNaN(numCrashesNum) ? 0 : numCrashesNum;
    }
    set numCrashes(value) {
        this.replaceValue(VELOCITY_CRASHES, GithubIssue.num2str(value));
    }
    get numCrashesString() {
        return GithubIssue.num2str(this.numCrashes);
    }
    get crashPercentage() {
        const parsedPct = this.extractValue(VELOCITY_PERCENT) || '?';
        const pctStrValue = parsedPct.replace('%', '');
        const pctNumber = parseFloat(pctStrValue);
        return isNaN(pctNumber) ? 0.0 : pctNumber / 100;
    }
    set crashPercentage(value) {
        this.replaceValue(VELOCITY_PERCENT, GithubIssue.pct2str(value));
    }
    get crashPercentageString() {
        return GithubIssue.pct2str(this.crashPercentage);
    }
    static fromGithubIssueResponse(json) {
        return new GithubIssue({
            githubNumber: json['number'],
            githubUrl: json['html_url'],
            githubTitle: json['title'],
            body: json['body'],
            assignees: (json['assignees'] || []).map((a) => a['login']),
            labels: (json['labels'] || []).map((a) => a['name']),
            milestone: !!json['milestone'] ? json['milestone']['number'] : null,
            state: json['state'],
        });
    }
    static fromCrashlyticsIssue(json) {
        return new GithubIssue({
            githubTitle: json.issueTitle,
            body: GithubIssue.createIssueDescription(json),
            assignees: config_1.default.githubIssueAssignees,
            labels: config_1.default.githubLabelsIssue,
        });
    }
    updateWithCrashlyticsIssue(crashlyticsIssue) {
        var _a, _b;
        this.appVersion = crashlyticsIssue.appInfo.latestAppVersion;
        this.crashPercentage = ((_a = crashlyticsIssue.velocityAlert) === null || _a === void 0 ? void 0 : _a.crashPercentage) || 0;
        this.numCrashes = ((_b = crashlyticsIssue.velocityAlert) === null || _b === void 0 ? void 0 : _b.crashes) || 0;
    }
    toRequestJson() {
        const json = {
            title: this.githubTitle,
            body: this.body,
            assignees: this.assignees,
            labels: Array.from(new Set(this.labels)),
        };
        if (this.milestone) {
            json.milestone = this.milestone;
        }
        if (this.state) {
            json.state = this.state;
        }
        return json;
    }
    toString() {
        return `GithubIssue(${this.githubId}:${this.crashlyticsId})`;
    }
    replaceValue(valueId, value) {
        this.body = this.body.replace(this.createValueRegEx(valueId), `${valueId} ${value} |`);
    }
    createValueRegEx(valueId) {
        return new RegExp(`${valueId}[ ]+(.*)[ ]+\\|`);
    }
    extractValue(valueId) {
        const matchResult = this.body.match(this.createValueRegEx(valueId));
        return matchResult === null || matchResult === void 0 ? void 0 : matchResult.pop();
    }
    static pct2str(pct) {
        return !!pct ? `${(pct * 100).toFixed(2)}%` : '?';
    }
    static num2str(num) {
        return !!num ? `${num}` : '?';
    }
    static createIssueDescription(issue) {
        var _a, _b;
        return `
## Crashlytics information
View the issue in [Firebase Console](https://console.firebase.google.com/project/${config_1.default.projectId}/crashlytics/app/${issue.appInfo.appPlatform}:${issue.appInfo.appId}/issues/${issue.issueId}).

<!--
Do not change anything in the table below; it is automatically
generated and parsed by the crashlytics-github extension.
Apart from that, you can add and update issue description
above or below the table.

See more information here:
https://github.com/oddbit/crashlytics-github/blob/master/README.md
-->

| Attribute | Value |
|--------|---------|
| Crashlytics ID | ${CRASHLYTICS_ID} ${issue.issueId} |
| Crashlytics Title | ${CRASHLYTICS_TITLE} ${issue.issueTitle} |
| Issue Created | ${CREATE_TIME} ${issue.createTime} |
| Crash Percentage | ${VELOCITY_PERCENT} ${GithubIssue.pct2str((_a = issue.velocityAlert) === null || _a === void 0 ? void 0 : _a.crashPercentage)} |
| Num Crashes | ${VELOCITY_CRASHES} ${GithubIssue.num2str((_b = issue.velocityAlert) === null || _b === void 0 ? void 0 : _b.crashes)} |
| App ID | ${APP_ID} ${issue.appInfo.appId} |
| App Name |${APP_NAME} ${issue.appInfo.appName} |
| App Platform | ${APP_PLATFORM} ${issue.appInfo.appPlatform} |
| App Version | ${APP_VERSION} ${issue.appInfo.latestAppVersion} |
`;
    }
}
exports.GithubIssue = GithubIssue;
//# sourceMappingURL=issue.model.js.map