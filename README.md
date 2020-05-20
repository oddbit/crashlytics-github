# Integrate Crashlytics with Github issues

**Description**: Integrates Crashlytics issue reports with Github Issues and keeps them up to date.



**Details**: Use this extension to add integrate Crashlytics reports with Github Issues.

This extension creates and updates Github Issues with information from Crashlyitics. It will mark up issues
so that they can be updated upon new information such as velocity reports or regressions.

This extension uses Github API, so you'll need to supply a
[Github Personal Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

#### Additional setup

Make sure that you've configured and set up [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) in your app.

You must also have a personal Github account with access to the repository where you manage your issues before installing this extension.

#### Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions (including Outbound networking)

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)

Usage of this extension also requires you to have a Github account. You are responsible for any associated costs with your usage of Github.




**Configuration Parameters:**

* Cloud Functions location: Where do you want to deploy the functions created for this extension?

* Github API user: The user account that the extension will be used to access the Github Repository. All issues and comments that are created will be using this account as actor. This is most likely, you who are reading this. Your own Github Account.

* Github Personal Access Token: [Read Github Documentation](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
 on how to obtain a Github Personal Access Token.

* Github Repository: The name of the Github Repository where the issue reports will be created. This should be the full repository reference with both owner and repository name. For example: [octocat/Hello-World](https://github.com/octocat/Hello-World)

* Github Issue Assignees: Automatically assign the issues to a repository collaborator. Provide a comma separated list of users, such as: octocat, DennisAlund Each comma separated value will add a user as assignee to the issue.

* Crashlytics Issue Labels: Github issue labels to be added if Crashlytics is reporting a new issue. Provide a comma separated list of labels, such as: bug, crashlytics Each comma separated value will add a label to the issue.

* Velocity Alert Labels: Github issue labels to be added if Crashlytics is reporting a velocity alert. Provide a comma separated list of labels, such as: bug, crashlytics: velocity, priority Each comma separated value will add a label to the issue.



**Cloud Functions:**

* **createNewGithubIssue:** Creates new Github Issue when a new Crashlytics Issue is created.

* **updateVelocityAlert:** Listens for velocity alerts and updates existing Github issues with new information, or creates a new Github issue if not possible to find any existing Github issue that matches.
