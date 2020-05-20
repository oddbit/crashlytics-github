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
import { GithubIssue } from './issue.model';

type ApiMethods = 'GET' | 'PATCH' | 'POST';
function callApi(method: ApiMethods, endPoint: string, payload: any) {
  const apiUser = config.githubApiUser;
  const apiToken = config.githubAccessToken;
  const repository = config.githubRepository;
  const apiUrl = `https://api.github.com/repos/${repository}/${endPoint}`;
  console.log('[callApi] ' + JSON.stringify({ apiUser, repository, apiUrl }));

  return rp({
    auth: {
      user: apiUser,
      pass: apiToken,
    },
    method: method,
    uri: apiUrl,
    body: payload,
    json: true,
    headers: { 'user-agent': 'oddbit/crashlytics-integration' },
  });
}

export async function findIssue(
  crashlyticsIssue: functions.crashlytics.Issue,
): Promise<GithubIssue | null> {
  console.log(`[findIssue] Find issue" ${crashlyticsIssue.issueId}`);
  const queryParams = { since: crashlyticsIssue.createTime };
  const responseIssues = (await callApi('GET', `issues`, queryParams)) || [];
  console.log(
    `Got ${responseIssues.length} issues since ${crashlyticsIssue.createTime}`,
  );

  const matchingIssue: GithubIssue = responseIssues
    .map((responseIssue: any) =>
      GithubIssue.fromGithubIssueResponse(responseIssue),
    )
    .filter(
      (githubIssue: GithubIssue) =>
        githubIssue.crashlyticsId === crashlyticsIssue.issueId,
    )
    .pop();

  console.log(`[findIssue] Result: ${matchingIssue}`);
  return matchingIssue || null;
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
  if (!githubIssue.githubNumber) {
    throw new Error('Issue must already have a Github Issue number');
  }
  console.log(`[updateIssue] ${githubIssue}`);
  return callApi(
    'PATCH',
    `issues/${githubIssue.githubNumber}`,
    githubIssue.toRequestJson(),
  );
}

export function commentVelocityReport(
  issueBefore: GithubIssue,
  issueAfter: GithubIssue,
) {
  console.log(`[commentVelocityReport] ${issueBefore})}`);

  const comment = [
    `## Crashlytics Velocity Alert Report`,
    `| Crashes | Before | After |`,
    `|--------|---------|---------|`,
    `| Count |  ${issueBefore.numCrashesString} | ${issueAfter.numCrashesString} |`,
    `| Percentage | ${issueBefore.crashPercentageString} | ${issueAfter.crashPercentageString} |`,
  ].join('\n');

  return callApi('POST', `issues/${issueBefore.githubNumber}/comments`, {
    body: comment,
  });
}
