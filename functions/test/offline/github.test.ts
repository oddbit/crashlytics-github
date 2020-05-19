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

import { expect } from 'chai';
import * as functions from 'firebase-functions';
import { describe, it } from 'mocha';
import { GithubIssue } from '../../../functions/src/github-issue';
import * as githubDescriptionUtils from '../../../functions/src/description-utils';

describe('Github', () => {
  let issue: functions.crashlytics.Issue;
  beforeEach(() => {
    issue = {
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    };
  });

  it('Should be to create Github Issue Request from response', () => {
    const issueRequest = GithubIssue.fromGithubIssueResponse({
      url: 'https://api.github.com/repos/DennisAlund/testing-actions/issues/9',
      repository_url:
        'https://api.github.com/repos/DennisAlund/testing-actions',
      labels_url:
        'https://api.github.com/repos/DennisAlund/testing-actions/issues/9/labels{/name}',
      comments_url:
        'https://api.github.com/repos/DennisAlund/testing-actions/issues/9/comments',
      events_url:
        'https://api.github.com/repos/DennisAlund/testing-actions/issues/9/events',
      html_url: 'https://github.com/DennisAlund/testing-actions/issues/9',
      id: 620362946,
      node_id: 'MDU6SXNzdWU2MjAzNjI5NDY=',
      number: 9,
      title: 'issue-title',
      user: {
        login: 'DennisAlund',
        id: 2051607,
        node_id: 'MDQ6VXNlcjIwNTE2MDc=',
        avatar_url: 'https://avatars1.githubusercontent.com/u/2051607?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/DennisAlund',
        html_url: 'https://github.com/DennisAlund',
        followers_url: 'https://api.github.com/users/DennisAlund/followers',
        following_url:
          'https://api.github.com/users/DennisAlund/following{/other_user}',
        gists_url: 'https://api.github.com/users/DennisAlund/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/DennisAlund/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/DennisAlund/subscriptions',
        organizations_url: 'https://api.github.com/users/DennisAlund/orgs',
        repos_url: 'https://api.github.com/users/DennisAlund/repos',
        events_url: 'https://api.github.com/users/DennisAlund/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/DennisAlund/received_events',
        type: 'User',
        site_admin: false,
      },
      labels: [
        {
          id: 2070378624,
          node_id: 'MDU6TGFiZWwyMDcwMzc4NjI0',
          url:
            'https://api.github.com/repos/DennisAlund/testing-actions/labels/Crashlytics',
          name: 'Crashlytics',
          color: 'ededed',
          default: false,
          description: null,
        },
        {
          id: 2011627490,
          node_id: 'MDU6TGFiZWwyMDExNjI3NDkw',
          url:
            'https://api.github.com/repos/DennisAlund/testing-actions/labels/bug',
          name: 'bug',
          color: 'd73a4a',
          default: true,
          description: "Something isn't working",
        },
      ],
      state: 'open',
      locked: false,
      assignee: {
        login: 'DennisAlund',
        id: 2051607,
        node_id: 'MDQ6VXNlcjIwNTE2MDc=',
        avatar_url: 'https://avatars1.githubusercontent.com/u/2051607?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/DennisAlund',
        html_url: 'https://github.com/DennisAlund',
        followers_url: 'https://api.github.com/users/DennisAlund/followers',
        following_url:
          'https://api.github.com/users/DennisAlund/following{/other_user}',
        gists_url: 'https://api.github.com/users/DennisAlund/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/DennisAlund/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/DennisAlund/subscriptions',
        organizations_url: 'https://api.github.com/users/DennisAlund/orgs',
        repos_url: 'https://api.github.com/users/DennisAlund/repos',
        events_url: 'https://api.github.com/users/DennisAlund/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/DennisAlund/received_events',
        type: 'User',
        site_admin: false,
      },
      assignees: [
        {
          login: 'DennisAlund',
          id: 2051607,
          node_id: 'MDQ6VXNlcjIwNTE2MDc=',
          avatar_url: 'https://avatars1.githubusercontent.com/u/2051607?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/DennisAlund',
          html_url: 'https://github.com/DennisAlund',
          followers_url: 'https://api.github.com/users/DennisAlund/followers',
          following_url:
            'https://api.github.com/users/DennisAlund/following{/other_user}',
          gists_url: 'https://api.github.com/users/DennisAlund/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/DennisAlund/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/DennisAlund/subscriptions',
          organizations_url: 'https://api.github.com/users/DennisAlund/orgs',
          repos_url: 'https://api.github.com/users/DennisAlund/repos',
          events_url:
            'https://api.github.com/users/DennisAlund/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/DennisAlund/received_events',
          type: 'User',
          site_admin: false,
        },
      ],
      milestone: {
        url:
          'https://api.github.com/repos/DennisAlund/testing-actions/milestones/10',
        html_url: 'https://github.com/DennisAlund/testing-actions/milestone/10',
        labels_url:
          'https://api.github.com/repos/DennisAlund/testing-actions/milestones/10/labels',
        id: 5345421,
        node_id: 'MDk6TWlsZXN0b25lNTM0NTQyMQ==',
        number: 10,
        title: 'Test milestone 3',
        description: '',
        creator: [Object],
        open_issues: 1,
        closed_issues: 0,
        state: 'closed',
        created_at: '2020-04-24T15:02:58Z',
        updated_at: '2020-04-24T15:03:24Z',
        due_on: null,
        closed_at: '2020-04-24T15:03:24Z',
      },
      comments: 0,
      created_at: '2020-05-18T16:57:26Z',
      updated_at: '2020-05-18T16:57:27Z',
      closed_at: null,
      author_association: 'OWNER',
      body: 'Issue body',
    });

    expect(issueRequest.title).equal('issue-title');
    expect(issueRequest.body).equal('Issue body');
    expect(issueRequest.labels).to.eql(['Crashlytics', 'bug']);
    expect(issueRequest.assignees).to.eql(['DennisAlund']);
    expect(issueRequest.milestone).equal(10);
    expect(issueRequest.state).equal('open');
  });

  it('Should be able to get issue id from description', () => {
    const descriptionBody = githubDescriptionUtils.createIssueDescription(
      issue,
    );

    const parsedIssueId = githubDescriptionUtils.getIssueId(descriptionBody);
    expect(parsedIssueId).equal('issue-id');
  });

  it('Should be able to get app version from description', () => {
    const descriptionBody = githubDescriptionUtils.createIssueDescription(
      issue,
    );
    const parsedAppVersion = githubDescriptionUtils.getAppVersion(
      descriptionBody,
    );
    expect(parsedAppVersion).equal(issue.appInfo.latestAppVersion);
  });

  it('Should expect num crashes to be zero if no velocity alert', () => {
    const descriptionBody = githubDescriptionUtils.createIssueDescription({
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    });
    const parsedNumCrashes = githubDescriptionUtils.getNumCrashes(
      descriptionBody,
    );
    expect(isNaN(parsedNumCrashes)).equal(
      false,
      'Num crashes should not be NaN',
    );
    expect(parsedNumCrashes).equal(0);
  });

  it('Should expect crash percentage to be zero if no velocity alert', () => {
    const descriptionBody = githubDescriptionUtils.createIssueDescription({
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    });
    const parsedCrashPct = githubDescriptionUtils.getNumCrashes(
      descriptionBody,
    );
    expect(isNaN(parsedCrashPct)).equal(false, 'Crash pct should not be NaN');
    expect(parsedCrashPct).equal(0.0);
  });

  it('Should be able to extract num crashes from velocity alert', () => {
    const descriptionBody = githubDescriptionUtils.createIssueDescription({
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      velocityAlert: {
        crashPercentage: 0.12,
        crashes: 42,
      },
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    });
    const parsedNumCrashes = githubDescriptionUtils.getNumCrashes(
      descriptionBody,
    );
    expect(isNaN(parsedNumCrashes)).equal(false, 'Should not be NaN');
    expect(parsedNumCrashes).equal(42);
  });

  it('Should be able to extract whole number crash percent from velocity alert', () => {
    const descriptionBody = githubDescriptionUtils.createIssueDescription({
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      velocityAlert: {
        crashPercentage: 0.12,
        crashes: 42,
      },
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    });
    const parsedCrashPct = githubDescriptionUtils.getCrashPercentage(
      descriptionBody,
    );
    expect(isNaN(parsedCrashPct)).equal(false, 'Should not be NaN');
    expect(parsedCrashPct).equal(0.12);
  });

  it('Should be able to extract fraction number crash percent from velocity alert', () => {
    const descriptionBody = githubDescriptionUtils.createIssueDescription({
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      velocityAlert: {
        crashPercentage: 0.1234,
        crashes: 42,
      },
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    });
    const parsedCrashPct = githubDescriptionUtils.getCrashPercentage(
      descriptionBody,
    );
    expect(isNaN(parsedCrashPct)).equal(false, 'Should not be NaN');
    expect(parsedCrashPct).equal(0.1234);
  });

  it('Should be able to update issue description without touching custom description', () => {
    const issueDataBefore = {
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      velocityAlert: {
        crashPercentage: 0.12,
        crashes: 42,
      },
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    };
    const issueDataAfter = {
      ...issueDataBefore,
      velocityAlert: { crashPercentage: 0.23, crashes: 99 },
    };

    const issueCustomDescriptionPrefix = '## Initially\nHello World!';
    const issueCustomDescriptionSuffix = "## Final words\nThat's all folks!";
    const descriptionBodyBefore = [
      issueCustomDescriptionPrefix,
      githubDescriptionUtils.createIssueDescription(issueDataBefore),
      issueCustomDescriptionSuffix,
    ].join('\n');

    const descriptionBodyAfter = githubDescriptionUtils.updateIssueDescription(
      descriptionBodyBefore,
      issueDataAfter,
    );

    // Github users might have added more information to the issue description
    // before or after the auto-generated table data.
    expect(descriptionBodyAfter.split(' ').length).equal(
      descriptionBodyBefore.split(' ').length,
      'Should not have altered any other text in teh description.',
    );

    expect(descriptionBodyAfter)
      .to.be.a('string')
      .and.satisfy((desc: string) =>
        desc.startsWith(issueCustomDescriptionPrefix),
      );

    expect(descriptionBodyAfter)
      .to.be.a('string')
      .and.satisfy((desc: string) =>
        desc.endsWith(issueCustomDescriptionSuffix),
      );
  });

  it('Should be able to update issue description with CREATED velocity information', () => {
    const issueDataBefore: functions.crashlytics.Issue = {
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    };
    const issueDataAfter: functions.crashlytics.Issue = {
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      velocityAlert: {
        crashPercentage: 0.1234,
        crashes: 42,
      },
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    };

    const descriptionBodyBefore = githubDescriptionUtils.createIssueDescription(
      issueDataBefore,
    );
    const descriptionBodyAfter = githubDescriptionUtils.updateIssueDescription(
      descriptionBodyBefore,
      issueDataAfter,
    );

    const parsedCrashPct = githubDescriptionUtils.getCrashPercentage(
      descriptionBodyAfter,
    );
    expect(isNaN(parsedCrashPct)).equal(false, 'Should not be NaN');
    expect(parsedCrashPct).equal(0.1234);

    const parsedNumCrashes = githubDescriptionUtils.getNumCrashes(
      descriptionBodyAfter,
    );
    expect(isNaN(parsedNumCrashes)).equal(false, 'Should not be NaN');
    expect(parsedNumCrashes).equal(42);
  });

  it('Should be able to update issue description with UPDATED velocity information', () => {
    const issueDataBefore = {
      issueId: 'issue-id',
      createTime: '2020-06-14T02:15:00.000+08:00',
      issueTitle: 'issue-title',
      velocityAlert: {
        crashPercentage: 0.12,
        crashes: 42,
      },
      appInfo: {
        appId: 'app-id',
        appName: 'app-name',
        appPlatform: 'app-platform',
        latestAppVersion: '1.2.3+4-pre_alfa',
      },
    };
    const issueDataAfter = {
      ...issueDataBefore,
      velocityAlert: { crashPercentage: 0.23, crashes: 99 },
    };

    const descriptionBodyBefore = githubDescriptionUtils.createIssueDescription(
      issueDataBefore,
    );
    const descriptionBodyAfter = githubDescriptionUtils.updateIssueDescription(
      descriptionBodyBefore,
      issueDataAfter,
    );

    const parsedCrashPct = githubDescriptionUtils.getCrashPercentage(
      descriptionBodyAfter,
    );
    expect(isNaN(parsedCrashPct)).equal(false, 'Should not be NaN');
    expect(parsedCrashPct).equal(0.23);

    const parsedNumCrashes = githubDescriptionUtils.getNumCrashes(
      descriptionBodyAfter,
    );
    expect(isNaN(parsedNumCrashes)).equal(false, 'Should not be NaN');
    expect(parsedNumCrashes).equal(99);
  });
});
