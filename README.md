# Integrate Crashlytics with Github issues

### Description

Integrates Crashlytics issue reports with Github Issues and keeps them up to date.

### Details

Use this extension to add integrate Crashlytics reports with Github Issues.

This extension creates and updates Github Issues with information from Crashlytics. It will mark up issues
so that they can be updated upon new information such as velocity reports or regressions.

This extension uses Github API, so you'll need to supply a
[Github Personal Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

### Additional setup

Make sure that you've configured and set up [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) in your app.

You must also have a personal Github account with access to the repository where you manage your issues before installing this extension.

### Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions (including Outbound networking)

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)

Usage of this extension also requires you to have a Github account. You are responsible for any associated costs with your usage of Github.

### Configuration Parameters

- **Cloud Functions location:** Where do you want to deploy the functions created for this extension?

- **Github API user:** The Github username that the extension will use is Github API requests. All issues and comments that are created will be using this account as actor.

  For example: `octocat`

- **Github Personal Access Token:** The personal access token that will be used to authorize Github API requests. This access token must have `repo` scope access.

  [Read Github Documentation](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
  on how to obtain a Github Personal Access Token.

- **Github Repository:** The name of the Github Repository where the issue reports will be created. This should be the full repository reference with both owner and repository name.

  For example: `octocat/Hello-World`

- **Github Issue Assignees:** Which user(s) should be assigned to the issue by default? Provide one or several **Github usernames** in a comma separated string.

  For example: `octocat, DennisAlund`

- **Crashlytics Issue Labels:** What [Github issue labels](https://help.github.com/en/github/managing-your-work-on-github/about-labels)
  should be added to a **new** issue that is being created?
  You can provide one or several labels in a comma separated string.

  For example: `bug, crashlytics`

- **Velocity Alert Labels:** What [Github issue labels](https://help.github.com/en/github/managing-your-work-on-github/about-labels)
  should be added to a **velocity alert update**? You can provide one or several labels
  in a comma separated string.

  The labels you provide here are **additional** to those that you provided for new issues. Existing issue labels are unchanged if you skip this configuration value.

  For example: `crashlytics:velocity, priority`

- **Regression Labels:** What [Github issue labels](https://help.github.com/en/github/managing-your-work-on-github/about-labels)
  should be added to a **regressed issue**? You can provide one or several labels in a comma separated string.

  The labels you provide here are **additional** to those that you provided for new issues. Existing issue labels are unchanged if you skip this configuration value.

  For example: `crashlytics:regression, priority`

### Cloud Functions

- **createNewGithubIssue:** Creates new Github Issue when a new Crashlytics Issue is created.

- **updateVelocityAlert:** Listens for velocity alerts and updates existing Github issues with new information, or creates a new Github issue if not possible to find any existing Github issue that matches.

- **updateRegression:** Listens for regressed issue reports in Crashlytics and updates existing Github issues with new information, or creates a new Github issue if not possible to find any existing Github issue that matches.
