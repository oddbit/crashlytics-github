### See it in action

You can test out this extension right away!

1.  Follow the instructions to configure and add Crashlytics to your app.

1.  [Trigger a crash](https://firebase.google.com/docs/crashlytics/test-implementation) in your app.

1.  Check that the crash report appears in your [Crashlytics Console](https://console.firebase.google.com/project/${param:PROJECT_ID}/crashlytics)

1.  A Github issue will be created or updated in [your repository](https://github.com/${param:GITHUB_REPOSITORY}/issues)

### Using the extension

Whenever an issue is created or updated, this extension will report that information to an issue in your Github repository.
It will create a new issue or update an existing, depending on the type of Crashlytics event.

### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
