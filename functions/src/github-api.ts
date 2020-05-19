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
import * as rp from 'request-promise';
import config from './config';
import * as githubDescriptionUtils from './description-utils';
import { GithubIssue } from './github-issue';

type ApiMethods = 'GET' | 'PATCH' | 'POST';
function callApi(method: ApiMethods, endPoint: string, payload: any) {
  return rp({
    auth: {
      user: config.githubApiUser,
      pass: config.githubAccessToken,
    },
    method: method,
    uri: `https://api.github.com/repos/${config.githubRepository}/${endPoint}`,
    body: payload,
    json: true,
    headers: { 'user-agent': 'oddbit/crashlytics-integration' },
  });
}

export async function findIssue(
  issue: functions.crashlytics.Issue,
): Promise<GithubIssue | null> {
  const queryParams = { since: issue.createTime };
  const githubIssues = (await callApi('GET', `issues`, queryParams)) || [];
  console.log(`Got ${githubIssues.length} issues since ${issue.createTime}`);
  for (const githubIssue of githubIssues) {
    if (githubDescriptionUtils.getIssueId(githubIssue.body) === issue.issueId) {
      return GithubIssue.fromGithubIssueResponse(githubIssue);
    }
  }

  return null;
}

export async function createIssue(githubIssue: GithubIssue) {
  console.log(`[createIssue] ${githubIssue}`);

  const response = await callApi('POST', `issues`, githubIssue.toRequestJson());
  if (!response) {
    throw new Error('No response from Github API');
  }
  const createdGithubIssue = GithubIssue.fromGithubIssueResponse(response);
  console.log(`[createIssue] ${createdGithubIssue}`);
  return createdGithubIssue;
}

export function updateIssue(githubIssue: GithubIssue) {
  if (!githubIssue.number) {
    throw new Error('Issue must already have a Github Issue number');
  }
  console.log(`[updateIssue] ${githubIssue}`);
  return callApi(
    'PATCH',
    `issues/${githubIssue.number}`,
    githubIssue.toRequestJson(),
  );
}

export function commentVelocityReport(
  issueNumber: number,
  velocityAlertBefore?: functions.crashlytics.VelocityAlert,
  velocityAlertAfter?: functions.crashlytics.VelocityAlert,
) {
  console.log(
    `[commentVelocityReport] ${JSON.stringify({
      issueNumber,
      velocityAlertBefore,
      velocityAlertAfter,
    })}`,
  );
  const pctBefore = githubDescriptionUtils.stringifyVelocityPercent(
    velocityAlertBefore?.crashPercentage,
  );
  const pctAfter = githubDescriptionUtils.stringifyVelocityPercent(
    velocityAlertAfter?.crashPercentage,
  );

  const numCrashBefore = githubDescriptionUtils.stringifyVelocityCrashNum(
    velocityAlertBefore?.crashes,
  );
  const numCrashAfter = githubDescriptionUtils.stringifyVelocityCrashNum(
    velocityAlertAfter?.crashes,
  );
  const comment = [
    `## Crashlytics Velocity Alert Report`,
    `| Attribute | Before value | After value |`,
    `|--------|---------|---------|`,
    `| Pct Crashes | ${pctBefore} | ${pctAfter} |`,
    `| Num Crashes | ${numCrashBefore} | ${numCrashAfter} |`,
  ].join('\n');

  return callApi('POST', `issues/${issueNumber}/comments`, {
    body: comment,
  });
}
