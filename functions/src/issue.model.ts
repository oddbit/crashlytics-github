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

import * as functions from 'firebase-functions';
import config from './config';

const CRASHLYTICS_ID = '<!-- cgext_id -->';
const CRASHLYTICS_TITLE = '<!-- cgext_title -->';
const CREATE_TIME = '<!-- cgext_create_time -->';
const VELOCITY_PERCENT = '<!-- cgext_velocity_percent -->';
const VELOCITY_CRASHES = '<!-- cgext_velocity_crashes -->';
const APP_ID = '<!-- cgext_app_id -->';
const APP_NAME = '<!-- cgext_app_name -->';
const APP_PLATFORM = '<!-- cgext_app_platform -->';
const APP_VERSION = '<!-- cgext_app_version -->';

export interface IGithubIssue {
  githubNumber?: number;
  githubUrl?: string;
  githubTitle: string;
  body: string;
  assignees: string[];
  milestone?: number;
  state?: string;
  labels: string[];
}
export interface IGithubIssueRequest {
  title: string;
  body: string;
  assignees: string[];
  milestone?: number;
  state?: string;
  labels: string[];
}

export class GithubIssue implements IGithubIssue {
  readonly githubNumber?: number;
  readonly githubUrl?: string;
  readonly githubId?: string;
  githubTitle: string;
  body: string;
  assignees: string[];
  labels: string[];
  milestone?: number;
  state?: string;
  constructor(data: IGithubIssue) {
    this.githubNumber = data.githubNumber;
    this.githubUrl = data.githubUrl;
    this.githubId = data.githubUrl
      ?.replace('https://github.com/', '')
      ?.replace('/issues', '');

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

  set issueCreated(value: string) {
    this.replaceValue(CREATE_TIME, value);
  }

  get appVersion() {
    return this.extractValue(APP_VERSION) || '';
  }

  set appVersion(value: string) {
    this.replaceValue(APP_VERSION, value);
  }

  get numCrashes(): number {
    const numCrashes = this.extractValue(VELOCITY_CRASHES) || '?';
    const numCrashesNum = parseInt(numCrashes);
    return isNaN(numCrashesNum) ? 0 : numCrashesNum;
  }

  set numCrashes(value: number) {
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

  set crashPercentage(value: number) {
    this.replaceValue(VELOCITY_PERCENT, GithubIssue.pct2str(value));
  }

  get crashPercentageString() {
    return GithubIssue.pct2str(this.crashPercentage);
  }

  static fromGithubIssueResponse(json: any): GithubIssue {
    return new GithubIssue({
      githubNumber: json['number'],
      githubUrl: json['html_url'],
      githubTitle: json['title'],
      body: json['body'],
      assignees: (json['assignees'] || []).map((a: any) => a['login']),
      labels: (json['labels'] || []).map((a: any) => a['name']),
      milestone: !!json['milestone'] ? json['milestone']['number'] : null,
      state: json['state'],
    });
  }

  static fromCrashlyticsIssue(json: functions.crashlytics.Issue) {
    return new GithubIssue({
      githubTitle: json.issueTitle,
      body: GithubIssue.createIssueDescription(json),
      assignees: config.githubIssueAssignees,
      labels: config.githubLabelsIssue,
    });
  }

  updateWithCrashlyticsIssue(crashlyticsIssue: functions.crashlytics.Issue) {
    this.appVersion = crashlyticsIssue.appInfo.latestAppVersion;
    this.crashPercentage = crashlyticsIssue.velocityAlert?.crashPercentage || 0;
    this.numCrashes = crashlyticsIssue.velocityAlert?.crashes || 0;
  }

  toRequestJson(): IGithubIssueRequest {
    const json: IGithubIssueRequest = {
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

  private replaceValue(valueId: string, value: string) {
    this.body = this.body.replace(
      this.createValueRegEx(valueId),
      `${valueId} ${value} |`,
    );
  }

  private createValueRegEx(valueId: string) {
    return new RegExp(`${valueId}[ ]+(.*)[ ]+\\|`);
  }

  private extractValue(valueId: string) {
    const matchResult = this.body.match(this.createValueRegEx(valueId));
    return matchResult?.pop();
  }

  private static pct2str(pct?: number) {
    return !!pct ? `${(pct * 100).toFixed(2)}%` : '?';
  }

  private static num2str(num?: number) {
    return !!num ? `${num}` : '?';
  }

  private static createIssueDescription(issue: functions.crashlytics.Issue) {
    return `
## Crashlytics information

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
| Crash Percentage | ${VELOCITY_PERCENT} ${GithubIssue.pct2str(
      issue.velocityAlert?.crashPercentage,
    )} |
| Num Crashes | ${VELOCITY_CRASHES} ${GithubIssue.num2str(
      issue.velocityAlert?.crashes,
    )} |
| App ID | ${APP_ID} ${issue.appInfo.appId} |
| App Name |${APP_NAME} ${issue.appInfo.appName} |
| App Platform | ${APP_PLATFORM} ${issue.appInfo.appPlatform} |
| App Version | ${APP_VERSION} ${issue.appInfo.latestAppVersion} |
`;
  }
}
