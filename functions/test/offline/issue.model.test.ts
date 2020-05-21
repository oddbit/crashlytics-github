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
import { GithubIssue } from '../../src/issue.model';

describe('Model Tests', () => {
  let crashlyticsIssue: functions.crashlytics.Issue;
  let crashlyticsVelocityAlert: functions.crashlytics.Issue;
  let githubIssueApiResponseNoVelocity: any;
  let githubIssueApiResponseWithVelocity: any;

  beforeEach(() => {
    crashlyticsIssue = {
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
    crashlyticsVelocityAlert = {
      ...crashlyticsIssue,
      velocityAlert: {
        crashPercentage: 0.12,
        crashes: 42,
      },
    };
    githubIssueApiResponseWithVelocity = {
      id: 1,
      node_id: 'MDU6SXNzdWUx',
      url: 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
      repository_url: 'https://api.github.com/repos/octocat/Hello-World',
      labels_url:
        'https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}',
      comments_url:
        'https://api.github.com/repos/octocat/Hello-World/issues/1347/comments',
      events_url:
        'https://api.github.com/repos/octocat/Hello-World/issues/1347/events',
      html_url: 'https://github.com/octocat/Hello-World/issues/1347',
      number: 1347,
      state: 'open',
      title: 'Found a bug',
      body:
        '\n## Crashlytics information\n\n<!--\nDo not change anything in the table below; it is automatically\ngenerated and parsed by the crashlytics-github extension.\nApart from that, you can add and update issue description\nabove or below the table.\n\nSee more information here:\nhttps://github.com/oddbit/crashlytics-github/blob/master/README.md\n-->\n\n| Attribute | Value |\n|--------|---------|\n| Issue ID | <!-- cgext_id --> issue-id |\n| Issue Title | <!-- cgext_title --> issue-title |\n| Issue Created | <!-- cgext_create_time --> 2020-06-14T02:15:00.000+08:00 |\n| Percent Crashes | <!-- cgext_velocity_percent --> 12.00% |\n| Num Crashes | <!-- cgext_velocity_crashes --> 42 |\n| App ID | <!-- cgext_app_id --> app-id |\n| App Name |<!-- cgext_app_name --> app-name |\n| App Platform | <!-- cgext_app_platform --> app-platform |\n| App Version | <!-- cgext_app_version --> 1.2.3+4-pre_alfa |\n',
      user: {
        login: 'octocat',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
        gravatar_id: '',
        url: 'https://api.github.com/users/octocat',
        html_url: 'https://github.com/octocat',
        followers_url: 'https://api.github.com/users/octocat/followers',
        following_url:
          'https://api.github.com/users/octocat/following{/other_user}',
        gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
        organizations_url: 'https://api.github.com/users/octocat/orgs',
        repos_url: 'https://api.github.com/users/octocat/repos',
        events_url: 'https://api.github.com/users/octocat/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/octocat/received_events',
        type: 'User',
        site_admin: false,
      },
      labels: [
        {
          id: 208045946,
          node_id: 'MDU6TGFiZWwyMDgwNDU5NDY=',
          url: 'https://api.github.com/repos/octocat/Hello-World/labels/bug',
          name: 'bug',
          description: "Something isn't working",
          color: 'f29513',
          default: true,
        },
      ],
      assignee: {
        login: 'octocat',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
        gravatar_id: '',
        url: 'https://api.github.com/users/octocat',
        html_url: 'https://github.com/octocat',
        followers_url: 'https://api.github.com/users/octocat/followers',
        following_url:
          'https://api.github.com/users/octocat/following{/other_user}',
        gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
        organizations_url: 'https://api.github.com/users/octocat/orgs',
        repos_url: 'https://api.github.com/users/octocat/repos',
        events_url: 'https://api.github.com/users/octocat/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/octocat/received_events',
        type: 'User',
        site_admin: false,
      },
      assignees: [
        {
          login: 'octocat',
          id: 1,
          node_id: 'MDQ6VXNlcjE=',
          avatar_url: 'https://github.com/images/error/octocat_happy.gif',
          gravatar_id: '',
          url: 'https://api.github.com/users/octocat',
          html_url: 'https://github.com/octocat',
          followers_url: 'https://api.github.com/users/octocat/followers',
          following_url:
            'https://api.github.com/users/octocat/following{/other_user}',
          gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/octocat/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/octocat/subscriptions',
          organizations_url: 'https://api.github.com/users/octocat/orgs',
          repos_url: 'https://api.github.com/users/octocat/repos',
          events_url: 'https://api.github.com/users/octocat/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/octocat/received_events',
          type: 'User',
          site_admin: false,
        },
      ],
      milestone: {
        url: 'https://api.github.com/repos/octocat/Hello-World/milestones/1',
        html_url: 'https://github.com/octocat/Hello-World/milestones/v1.0',
        labels_url:
          'https://api.github.com/repos/octocat/Hello-World/milestones/1/labels',
        id: 1002604,
        node_id: 'MDk6TWlsZXN0b25lMTAwMjYwNA==',
        number: 1,
        state: 'open',
        title: 'v1.0',
        description: 'Tracking milestone for version 1.0',
        creator: {
          login: 'octocat',
          id: 1,
          node_id: 'MDQ6VXNlcjE=',
          avatar_url: 'https://github.com/images/error/octocat_happy.gif',
          gravatar_id: '',
          url: 'https://api.github.com/users/octocat',
          html_url: 'https://github.com/octocat',
          followers_url: 'https://api.github.com/users/octocat/followers',
          following_url:
            'https://api.github.com/users/octocat/following{/other_user}',
          gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/octocat/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/octocat/subscriptions',
          organizations_url: 'https://api.github.com/users/octocat/orgs',
          repos_url: 'https://api.github.com/users/octocat/repos',
          events_url: 'https://api.github.com/users/octocat/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/octocat/received_events',
          type: 'User',
          site_admin: false,
        },
        open_issues: 4,
        closed_issues: 8,
        created_at: '2011-04-10T20:09:31Z',
        updated_at: '2014-03-03T18:58:10Z',
        closed_at: '2013-02-12T13:22:01Z',
        due_on: '2012-10-09T23:39:01Z',
      },
      locked: true,
      active_lock_reason: 'too heated',
      comments: 0,
      pull_request: {
        url: 'https://api.github.com/repos/octocat/Hello-World/pulls/1347',
        html_url: 'https://github.com/octocat/Hello-World/pull/1347',
        diff_url: 'https://github.com/octocat/Hello-World/pull/1347.diff',
        patch_url: 'https://github.com/octocat/Hello-World/pull/1347.patch',
      },
      closed_at: null,
      created_at: '2011-04-22T13:33:48Z',
      updated_at: '2011-04-22T13:33:48Z',
      closed_by: {
        login: 'octocat',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
        gravatar_id: '',
        url: 'https://api.github.com/users/octocat',
        html_url: 'https://github.com/octocat',
        followers_url: 'https://api.github.com/users/octocat/followers',
        following_url:
          'https://api.github.com/users/octocat/following{/other_user}',
        gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
        organizations_url: 'https://api.github.com/users/octocat/orgs',
        repos_url: 'https://api.github.com/users/octocat/repos',
        events_url: 'https://api.github.com/users/octocat/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/octocat/received_events',
        type: 'User',
        site_admin: false,
      },
    };

    githubIssueApiResponseNoVelocity = {
      id: 1,
      node_id: 'MDU6SXNzdWUx',
      url: 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
      repository_url: 'https://api.github.com/repos/octocat/Hello-World',
      labels_url:
        'https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}',
      comments_url:
        'https://api.github.com/repos/octocat/Hello-World/issues/1347/comments',
      events_url:
        'https://api.github.com/repos/octocat/Hello-World/issues/1347/events',
      html_url: 'https://github.com/octocat/Hello-World/issues/1347',
      number: 1347,
      state: 'open',
      title: 'Found a bug',
      body:
        '\n## Crashlytics information\n\n<!--\nDo not change anything in the table below; it is automatically\ngenerated and parsed by the crashlytics-github extension.\nApart from that, you can add and update issue description\nabove or below the table.\n\nSee more information here:\nhttps://github.com/oddbit/crashlytics-github/blob/master/README.md\n-->\n\n| Attribute | Value |\n|--------|---------|\n| Issue ID | <!-- cgext_id --> issue-id |\n| Issue Title | <!-- cgext_title --> issue-title |\n| Issue Created | <!-- cgext_create_time --> 2020-06-14T02:15:00.000+08:00 |\n| Percent Crashes | <!-- cgext_velocity_percent --> ? |\n| Num Crashes | <!-- cgext_velocity_crashes --> ? |\n| App ID | <!-- cgext_app_id --> app-id |\n| App Name |<!-- cgext_app_name --> app-name |\n| App Platform | <!-- cgext_app_platform --> app-platform |\n| App Version | <!-- cgext_app_version --> 1.2.3+4-pre_alfa |\n',
      user: {
        login: 'octocat',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
        gravatar_id: '',
        url: 'https://api.github.com/users/octocat',
        html_url: 'https://github.com/octocat',
        followers_url: 'https://api.github.com/users/octocat/followers',
        following_url:
          'https://api.github.com/users/octocat/following{/other_user}',
        gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
        organizations_url: 'https://api.github.com/users/octocat/orgs',
        repos_url: 'https://api.github.com/users/octocat/repos',
        events_url: 'https://api.github.com/users/octocat/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/octocat/received_events',
        type: 'User',
        site_admin: false,
      },
      labels: [
        {
          id: 208045946,
          node_id: 'MDU6TGFiZWwyMDgwNDU5NDY=',
          url: 'https://api.github.com/repos/octocat/Hello-World/labels/bug',
          name: 'bug',
          description: "Something isn't working",
          color: 'f29513',
          default: true,
        },
      ],
      assignee: {
        login: 'octocat',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
        gravatar_id: '',
        url: 'https://api.github.com/users/octocat',
        html_url: 'https://github.com/octocat',
        followers_url: 'https://api.github.com/users/octocat/followers',
        following_url:
          'https://api.github.com/users/octocat/following{/other_user}',
        gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
        organizations_url: 'https://api.github.com/users/octocat/orgs',
        repos_url: 'https://api.github.com/users/octocat/repos',
        events_url: 'https://api.github.com/users/octocat/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/octocat/received_events',
        type: 'User',
        site_admin: false,
      },
      assignees: [
        {
          login: 'octocat',
          id: 1,
          node_id: 'MDQ6VXNlcjE=',
          avatar_url: 'https://github.com/images/error/octocat_happy.gif',
          gravatar_id: '',
          url: 'https://api.github.com/users/octocat',
          html_url: 'https://github.com/octocat',
          followers_url: 'https://api.github.com/users/octocat/followers',
          following_url:
            'https://api.github.com/users/octocat/following{/other_user}',
          gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/octocat/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/octocat/subscriptions',
          organizations_url: 'https://api.github.com/users/octocat/orgs',
          repos_url: 'https://api.github.com/users/octocat/repos',
          events_url: 'https://api.github.com/users/octocat/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/octocat/received_events',
          type: 'User',
          site_admin: false,
        },
      ],
      milestone: {
        url: 'https://api.github.com/repos/octocat/Hello-World/milestones/1',
        html_url: 'https://github.com/octocat/Hello-World/milestones/v1.0',
        labels_url:
          'https://api.github.com/repos/octocat/Hello-World/milestones/1/labels',
        id: 1002604,
        node_id: 'MDk6TWlsZXN0b25lMTAwMjYwNA==',
        number: 1,
        state: 'open',
        title: 'v1.0',
        description: 'Tracking milestone for version 1.0',
        creator: {
          login: 'octocat',
          id: 1,
          node_id: 'MDQ6VXNlcjE=',
          avatar_url: 'https://github.com/images/error/octocat_happy.gif',
          gravatar_id: '',
          url: 'https://api.github.com/users/octocat',
          html_url: 'https://github.com/octocat',
          followers_url: 'https://api.github.com/users/octocat/followers',
          following_url:
            'https://api.github.com/users/octocat/following{/other_user}',
          gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/octocat/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/octocat/subscriptions',
          organizations_url: 'https://api.github.com/users/octocat/orgs',
          repos_url: 'https://api.github.com/users/octocat/repos',
          events_url: 'https://api.github.com/users/octocat/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/octocat/received_events',
          type: 'User',
          site_admin: false,
        },
        open_issues: 4,
        closed_issues: 8,
        created_at: '2011-04-10T20:09:31Z',
        updated_at: '2014-03-03T18:58:10Z',
        closed_at: '2013-02-12T13:22:01Z',
        due_on: '2012-10-09T23:39:01Z',
      },
      locked: true,
      active_lock_reason: 'too heated',
      comments: 0,
      pull_request: {
        url: 'https://api.github.com/repos/octocat/Hello-World/pulls/1347',
        html_url: 'https://github.com/octocat/Hello-World/pull/1347',
        diff_url: 'https://github.com/octocat/Hello-World/pull/1347.diff',
        patch_url: 'https://github.com/octocat/Hello-World/pull/1347.patch',
      },
      closed_at: null,
      created_at: '2011-04-22T13:33:48Z',
      updated_at: '2011-04-22T13:33:48Z',
      closed_by: {
        login: 'octocat',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
        gravatar_id: '',
        url: 'https://api.github.com/users/octocat',
        html_url: 'https://github.com/octocat',
        followers_url: 'https://api.github.com/users/octocat/followers',
        following_url:
          'https://api.github.com/users/octocat/following{/other_user}',
        gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
        organizations_url: 'https://api.github.com/users/octocat/orgs',
        repos_url: 'https://api.github.com/users/octocat/repos',
        events_url: 'https://api.github.com/users/octocat/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/octocat/received_events',
        type: 'User',
        site_admin: false,
      },
    };
  });

  it('Should be able to create from crashlytics issue', () => {
    const issue = GithubIssue.fromCrashlyticsIssue(crashlyticsIssue);

    expect(issue.githubId).equal(undefined);
    expect(issue.githubNumber).equal(undefined);
    expect(issue.githubUrl).equal(undefined);
    expect(issue.title).equal(crashlyticsIssue.issueTitle);
    expect(issue.crashlyticsId).equal(crashlyticsIssue.issueId);
    expect(issue.crashlyticsTitle).equal(crashlyticsIssue.issueTitle);
    expect(issue.issueCreated).equal(crashlyticsIssue.createTime);
    expect(issue.issueResolved).equal('?');
    expect(issue.appId).equal(crashlyticsIssue.appInfo.appId);
    expect(issue.appName).equal(crashlyticsIssue.appInfo.appName);
    expect(issue.appPlatform).equal(crashlyticsIssue.appInfo.appPlatform);
    expect(issue.appVersion).equal(crashlyticsIssue.appInfo.latestAppVersion);
    expect(issue.crashPercentage).equal(0.0);
    expect(issue.crashPercentageString).equal('?');
    expect(issue.numCrashes).equal(0);
    expect(issue.numCrashesString).equal('?');
  });

  it('Should be able to create from crashlytics velocity alert', () => {
    const issue = GithubIssue.fromCrashlyticsIssue(crashlyticsVelocityAlert);

    expect(issue.crashlyticsId).equal(crashlyticsVelocityAlert.issueId);
    expect(issue.crashlyticsTitle).equal(crashlyticsVelocityAlert.issueTitle);
    expect(issue.issueCreated).equal(crashlyticsVelocityAlert.createTime);
    expect(issue.issueResolved).equal('?');
    expect(issue.appId).equal(crashlyticsVelocityAlert.appInfo.appId);
    expect(issue.appName).equal(crashlyticsVelocityAlert.appInfo.appName);
    expect(issue.appPlatform).equal(
      crashlyticsVelocityAlert.appInfo.appPlatform,
    );
    expect(issue.appVersion).equal(
      crashlyticsVelocityAlert.appInfo.latestAppVersion,
    );
    expect(issue.crashPercentage).equal(
      crashlyticsVelocityAlert.velocityAlert?.crashPercentage,
    );
    expect(issue.numCrashes).equal(
      crashlyticsVelocityAlert.velocityAlert?.crashes,
    );
  });

  it('Should be able to create from Github API response WITHOUT velocity alert', () => {
    const issue = GithubIssue.fromGithubIssueResponse(
      githubIssueApiResponseNoVelocity,
    );

    expect(issue.githubId).equal('octocat/Hello-World/1347');
    expect(issue.githubNumber).equal(1347);
    expect(issue.githubUrl).equal(
      'https://github.com/octocat/Hello-World/issues/1347',
    );
    expect(issue.title).equal('Found a bug');
    expect(issue.crashlyticsId).equal('issue-id');
    expect(issue.crashlyticsTitle).equal('issue-title');
    expect(issue.issueCreated).equal('2020-06-14T02:15:00.000+08:00');
    expect(issue.issueResolved).equal('?');
    expect(issue.appId).equal('app-id');
    expect(issue.appName).equal('app-name');
    expect(issue.appPlatform).equal('app-platform');
    expect(issue.appVersion).equal('1.2.3+4-pre_alfa');
    expect(issue.crashPercentage).equal(0.0);
    expect(issue.crashPercentageString).equal('?');
    expect(issue.numCrashes).equal(0);
    expect(issue.numCrashesString).equal('?');
  });

  it('Should be able to create from Github API response WITH velocity alert', () => {
    const issue = GithubIssue.fromGithubIssueResponse(
      githubIssueApiResponseWithVelocity,
    );

    expect(issue.githubId).equal('octocat/Hello-World/1347');
    expect(issue.githubNumber).equal(1347);
    expect(issue.githubUrl).equal(
      'https://github.com/octocat/Hello-World/issues/1347',
    );
    expect(issue.title).equal('Found a bug');
    expect(issue.crashlyticsId).equal('issue-id');
    expect(issue.crashlyticsTitle).equal('issue-title');
    expect(issue.issueCreated).equal('2020-06-14T02:15:00.000+08:00');
    expect(issue.issueResolved).equal('?');
    expect(issue.appId).equal('app-id');
    expect(issue.appName).equal('app-name');
    expect(issue.appPlatform).equal('app-platform');
    expect(issue.appVersion).equal('1.2.3+4-pre_alfa');
    expect(issue.crashPercentage).equal(0.12);
    expect(issue.crashPercentageString).equal('12.00%');
    expect(issue.numCrashes).equal(42);
    expect(issue.numCrashesString).equal('42');
    expect(issue.state).equal('open');
  });

  it('Should be able to apply velocity alert to existing github issue', () => {
    const issue = GithubIssue.fromGithubIssueResponse(
      githubIssueApiResponseNoVelocity,
    );
    issue.updateWithCrashlyticsIssue(crashlyticsVelocityAlert);

    expect(issue.appPlatform).equal(
      crashlyticsVelocityAlert.appInfo.appPlatform,
    );
    expect(issue.appVersion).equal(
      crashlyticsVelocityAlert.appInfo.latestAppVersion,
    );
    expect(issue.crashPercentage).equal(
      crashlyticsVelocityAlert.velocityAlert?.crashPercentage,
    );
    expect(issue.numCrashes).equal(
      crashlyticsVelocityAlert.velocityAlert?.crashes,
    );
  });

  it('Should be able to update issue description without touching custom description', () => {
    const issueCustomDescriptionPrefix = '## Initially\nHello World!';
    const issueCustomDescriptionSuffix = "## Final words\nThat's all folks!";
    const githubApiResponse = githubIssueApiResponseNoVelocity;
    githubApiResponse['body'] = [
      issueCustomDescriptionPrefix,
      githubApiResponse['body'],
      issueCustomDescriptionSuffix,
    ].join('\n');

    const issue = GithubIssue.fromGithubIssueResponse(
      githubIssueApiResponseNoVelocity,
    );

    const jsonBeforeChange = issue.toRequestJson();
    issue.updateWithCrashlyticsIssue(crashlyticsVelocityAlert);
    const jsonAfterChange = issue.toRequestJson();

    expect(jsonAfterChange.body).to.not.equal(
      jsonBeforeChange.body,
      'Velocity information should be different',
    );

    // Github users might have added more information to the issue description
    // before or after the auto-generated table data.
    expect(jsonBeforeChange.body.split(' ').length).equal(
      jsonAfterChange.body.split(' ').length,
      'Should not have altered any other text in the description.',
    );

    expect(jsonAfterChange.body)
      .to.be.a('string')
      .and.satisfy((desc: string) =>
        desc.startsWith(issueCustomDescriptionPrefix),
      );

    expect(jsonAfterChange.body)
      .to.be.a('string')
      .and.satisfy((desc: string) =>
        desc.endsWith(issueCustomDescriptionSuffix),
      );
  });

  it('Should be able to create from Github API response WITH velocity alert', () => {
    const dateString = '2020-05-21T11:12:13+08:00';
    const issue = GithubIssue.fromCrashlyticsIssue({
      ...crashlyticsIssue,
      resolvedTime: dateString,
    });

    expect(issue.issueResolved).equal(dateString);
    expect(issue.state).equal('open');
  });
});
