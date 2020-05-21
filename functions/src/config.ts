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

function csv2Array(csv?: string) {
  return (csv || '')
    .split(',')
    .map(value => value.trim())
    .filter(value => value !== '');
}

export default {
  projectId: process.env.PROJECT_ID,
  location: process.env.LOCATION,
  githubApiUser: process.env.GITHUB_API_USER,
  githubAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  githubRepository: process.env.GITHUB_REPOSITORY,
  githubIssueAssignees: csv2Array(process.env.ISSUE_ASSIGNEES),
  githubLabelsIssue: csv2Array(process.env.ISSUE_LABELS_NEW),
  githubLabelsVelocity: csv2Array(process.env.ISSUE_LABELS_VELOCITY),
  githubLabelsRegressed: csv2Array(process.env.ISSUE_LABELS_REGRESSED),
};
