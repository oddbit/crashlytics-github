Use this extension to add integrate Crashlytics reports with Github Issues.

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
