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
import * as githubApi from './github-api';
import { GithubIssue } from './issue.model';

export const createNewGithubIssue = functions.handler.crashlytics.issue.onNew(
  crashlyticsIssue => {
    console.log(JSON.stringify(crashlyticsIssue));

    return githubApi.createIssue(
      GithubIssue.fromCrashlyticsIssue(crashlyticsIssue),
    );
  },
);

export const updateVelocityAlert = functions.handler.crashlytics.issue.onVelocityAlert(
  async crashlyticsIssue => {
    const githubIssue = await githubApi.findIssue(crashlyticsIssue);
    if (!githubIssue) {
      console.log(
        `Could not find any Github issue matching ${crashlyticsIssue.issueId}`,
      );

      const newIssue = GithubIssue.fromCrashlyticsIssue(crashlyticsIssue);
      newIssue.labels.push(...config.githubLabelsVelocity);
      return githubApi.createIssue(newIssue);
    }

    const velocityAlertIssue = new GithubIssue(githubIssue);
    velocityAlertIssue.updateWithCrashlyticsIssue(crashlyticsIssue);
    velocityAlertIssue.labels.push(...config.githubLabelsVelocity);

    return Promise.all([
      githubApi.updateIssue(velocityAlertIssue),
      githubApi.commentVelocityReport(githubIssue, velocityAlertIssue),
    ]);
  },
);
