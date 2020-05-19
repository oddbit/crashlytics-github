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

export interface IGithubIssue {
  number?: number;
  url?: string;
  title: string;
  body: string;
  assignees: string[];
  milestone?: number;
  state?: string;
  labels: string[];
}

export class GithubIssue implements IGithubIssue {
  number?: number;
  url?: string;
  title: string;
  body: string;
  assignees: string[];
  labels: string[];
  milestone?: number;
  state?: string;
  constructor(data: IGithubIssue) {
    this.number = data.number;
    this.url = data.url;
    this.title = data.title;
    this.body = data.body;
    this.assignees = [...(data.assignees || [])];
    this.labels = [...(data.labels || [])];
    this.milestone = data.milestone;
    this.state = data.state;
  }

  static fromGithubIssueResponse(json: any) {
    return new GithubIssue({
      number: json['number'],
      url: json['web_url'],
      title: json['title'],
      body: json['body'],
      assignees: (json['assignees'] || []).map((a: any) => a['login']),
      labels: (json['labels'] || []).map((a: any) => a['name']),
      milestone: !!json['milestone'] ? json['milestone']['number'] : null,
      state: json['state'],
    });
  }

  toRequestJson(): IGithubIssue {
    const json: IGithubIssue = {
      title: this.title,
      body: this.body,
      assignees: this.assignees,
      labels: this.labels,
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
    if (!this.url || !this.number) {
      return `GithubIssue(new: ${this.title})`;
    }

    return `GithubIssue(#${this.number}: ${this.url})`;
  }
}
