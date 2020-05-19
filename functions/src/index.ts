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
import { createIssueDescription, getCrashPercentage, getNumCrashes, updateIssueDescription } from './description-utils';
import * as github from './github-api';
import { GithubIssue } from './github-issue';

export const createNewGithubIssue = functions.crashlytics
  .issue()
  .onNew(crashlyticsIssue => {
    console.log(JSON.stringify(crashlyticsIssue));
    const githubIssue = new GithubIssue({
      title: crashlyticsIssue.issueTitle,
      body: createIssueDescription(crashlyticsIssue),
      assignees: config.githubIssueAssignees,
      labels: config.githubIssueLabelsNew,
    });

    return github.createIssue(githubIssue);
  });

export const updateVelocityAlert = functions.crashlytics
  .issue()
  .onVelocityAlert(async crashlyticsIssue => {
    const githubIssue = await github.findIssue(crashlyticsIssue);
    if (!githubIssue) {
      console.log(
        `Could not find any Github issue matching ${crashlyticsIssue.issueId}`,
      );

      return github.createIssue(
        new GithubIssue({
          title: crashlyticsIssue.issueTitle,
          body: createIssueDescription(crashlyticsIssue),
          assignees: config.githubIssueAssignees,
          labels: config.githubIssueLabelsVelocity,
        }),
      );
    }

    console.log(
      `Updating velocity report in Github issue ${githubIssue.number}`,
    );
    const promises = [];

    githubIssue.body = updateIssueDescription(
      githubIssue.body,
      crashlyticsIssue,
    );

    promises.push(github.updateIssue(githubIssue));

    promises.push(
      github.commentVelocityReport(
        githubIssue.number,
        {
          crashPercentage: getCrashPercentage(githubIssue.body),
          crashes: getNumCrashes(githubIssue.body),
        },
        crashlyticsIssue.velocityAlert,
      ),
    );

    return Promise.all(promises);
  });
