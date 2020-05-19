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

function createTableRowRegEx(row: string) {
  return new RegExp(`.*\\|\\s+${row}\\s+\\|\\s+(.*)\\s+\\|\\s*\\n`);
}

function extractTableValue(description: string, row: string) {
  const matchResult = description.match(createTableRowRegEx(row));
  return matchResult?.pop() || null;
}

export function stringifyVelocityPercent(pct?: number) {
  return !!pct ? `${(pct * 100).toFixed(2)}%` : '?';
}

export function stringifyVelocityCrashNum(num?: number) {
  return !!num ? `${num}` : '?';
}

export function createIssueDescription(issue: functions.crashlytics.Issue) {
  return `
## Crashlytics information

<!--
Do not change the format of this table as it will
be parsed by Crashlytics plugin.
-->
| Attribute | Value |
|--------|---------|
| Issue ID | ${issue.issueId} |
| Issue Title | ${issue.issueTitle} |
| Issue Created | ${issue.createTime} |
| Pct Crashes | ${stringifyVelocityPercent(
    issue.velocityAlert?.crashPercentage,
  )} |
| Num Crashes | ${stringifyVelocityCrashNum(issue.velocityAlert?.crashes)} |
| App ID | ${issue.appInfo.appId} |
| App Name | ${issue.appInfo.appName} |
| App Platform | ${issue.appInfo.appPlatform} |
| App Version | ${issue.appInfo.latestAppVersion} |
`;
}

export function updateIssueDescription(
  issueDescription: string,
  issue: functions.crashlytics.Issue,
) {
  const createTableRow = (rowId: string, rowValue: string) =>
    `| ${rowId} | ${rowValue} |\n`;

  return issueDescription
    .replace(
      createTableRowRegEx(`Issue Created`),
      createTableRow('Issue Created', issue.createTime),
    )
    .replace(
      createTableRowRegEx(`Pct Crashes`),
      createTableRow(
        'Pct Crashes',
        !!issue.velocityAlert
          ? `${issue.velocityAlert.crashPercentage * 100}%`
          : '?',
      ),
    )
    .replace(
      createTableRowRegEx(`Num Crashes`),
      createTableRow('Num Crashes', `${issue.velocityAlert?.crashes || '?'}`),
    )
    .replace(
      createTableRowRegEx(`App Version`),
      createTableRow('App Version', issue.appInfo.latestAppVersion),
    );
}

export function getIssueId(issueDescription: string) {
  return extractTableValue(issueDescription, 'Issue ID');
}

export function getAppVersion(issueDescription: string) {
  return extractTableValue(issueDescription, 'App Version');
}

export function getNumCrashes(issueDescription: string) {
  const numCrashes = extractTableValue(issueDescription, 'Num Crashes') || '?';
  const numCrashesNum = parseInt(numCrashes);
  return isNaN(numCrashesNum) ? 0 : numCrashesNum;
}

export function getCrashPercentage(issueDescription: string) {
  const parsedPct = extractTableValue(issueDescription, 'Pct Crashes') || '?';
  const pctStrValue = parsedPct.replace('%', '');
  const pctNumber = parseFloat(pctStrValue);
  return isNaN(pctNumber) ? 0.0 : pctNumber / 100;
}
