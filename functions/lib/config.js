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
exports.default = {
    location: process.env.LOCATION,
    githubApiUser: process.env.GITHUB_API_USER,
    githubAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    githubRepository: process.env.GITHUB_REPOSITORY,
    githubIssueAssignees: (process.env.ISSUE_ASSIGNEES || '').split(','),
    githubLabelsIssue: (process.env.ISSUE_LABELS_NEW || '').split(','),
    githubLabelsVelocity: (process.env.ISSUE_LABELS_VELOCITY || '').split(','),
};
//# sourceMappingURL=config.js.map