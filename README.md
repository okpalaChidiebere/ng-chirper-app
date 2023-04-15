# NgChirperApp

This project is about learning how to ngrx to hold the state of the whole application by building a twitter clone

## Router Links

- Routing [Overview](https://codecraft.tv/courses/angular/routing/overview/)
- Learn more about sending data through url to pages in Angular [here](https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular)
- You can also pass state to pages as well if you want to pass the data through the url. Learn more [here](https://stackoverflow.com/questions/36835123/how-do-i-pass-data-to-angular-routed-components) and [here](https://medium.com/code-wild/state-based-routing-using-angulars-built-in-router-ecaa43a65ced)

## Adding Material theme

- [https://www.developer.com/languages/javascript/using-material-font-icons-in-your-angular-11-projects/](https://www.developer.com/languages/javascript/using-material-font-icons-in-your-angular-11-projects/)
- [https://material.angular.io/guide/getting-started](https://material.angular.io/guide/getting-started)
- [https://material.angular.io/components/categories](https://material.angular.io/components/categories)
- [https://codeible.com/view/videotutorial/Ir8gkmzhr5Lyt27dH7WH;title=Progress%20Bars](https://codeible.com/view/videotutorial/Ir8gkmzhr5Lyt27dH7WH;title=Progress%20Bars)
- [https://tudip.com/blog-post/how-to-install-angular-material/](https://tudip.com/blog-post/how-to-install-angular-material/)
- [https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/](https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/)
- https://github.com/tylermcginnis/react-redux-loading-bar

## More Links

- [Folder Structure tips Angular](https://www.tektutorialshub.com/angular/angular-folder-structure-best-practices/)
- [https://stackoverflow.com/questions/52028782/error-error-uncaught-in-promise-cannot-match-any-routes-url-segment](https://stackoverflow.com/questions/52028782/error-error-uncaught-in-promise-cannot-match-any-routes-url-segment)
- [Error Handling in ngrx effects](https://tomastrojcak.medium.com/ngrx-effects-error-handling-fb8b1b7f6450)
- [date pipe in Angular](https://www.codegrepper.com/code-examples/javascript/timestamp+pipe+angular#:~:text=angular%20date%20formats&text='short'%3A%20equivalent%20to%20',%2C%209%3A03%20AM).&text='medium'%3A%20equivalent%20to%20',01%20AM%20GMT%2B1).)
- [https://stackoverflow.com/questions/34405301/how-do-i-detect-change-to-ngmodel-on-a-select-tag-angular-2](https://stackoverflow.com/questions/34405301/how-do-i-detect-change-to-ngmodel-on-a-select-tag-angular-2)
- [Intercepting Http requests](https://stackoverflow.com/questions/58902441/ngrx-8-when-dispatching-action-store-is-undefined).
- Store middleWare Injecting into the whole application [here](https://ngrx.io/guide/store/recipes/injecting)
- Sharing Data Between Component Using Angular V4 And Above. See [here](https://medium.com/@reyraa/communicating-between-parent-and-child-components-in-angular2-c0741ae83be8) and [here](https://www.c-sharpcorner.com/article/sharing-data-between-component-using-angular-and-above/)

## Ngrx

- [https://medium.com/angular-in-depth/ngrx-action-creators-redesigned-d396960e46da](https://medium.com/angular-in-depth/ngrx-action-creators-redesigned-d396960e46da)
- [https://medium.com/nerd-for-tech/ngrx-local-component-store-a8635649e0c5](https://medium.com/nerd-for-tech/ngrx-local-component-store-a8635649e0c5)
- [https://massivepixel.io/blog/angular-state-management/](https://massivepixel.io/blog/angular-state-management/)
- [https://www.codemag.com/Article/1811061/Angular-and-the-Store](https://www.codemag.com/Article/1811061/Angular-and-the-Store)

## Explore Observable Links

- [https://stackoverflow.com/questions/44593306/how-to-wait-for-2-actions-in-ngrx-effects](https://stackoverflow.com/questions/44593306/how-to-wait-for-2-actions-in-ngrx-effects)
- [https://stackoverflow.com/questions/51752485/ngrx-effects-pass-data-through-to-catcherror](https://stackoverflow.com/questions/51752485/ngrx-effects-pass-data-through-to-catcherror)
- [https://stackoverflow.com/questions/51212126/action-dispatch-the-second-time-doesnt-effect-in-rxjs-and-angular-6](https://stackoverflow.com/questions/51212126/action-dispatch-the-second-time-doesnt-effect-in-rxjs-and-angular-6)

## Docker

- Env variables [here](https://vsupalov.com/docker-build-pass-environment-variables/) and [here](https://stackoverflow.com/questions/31198835/can-we-pass-env-variables-through-cmd-line-while-building-a-docker-image-through)
- [Understanding Tagging docker images](https://stevelasker.blog/2018/03/01/docker-tagging-best-practices-for-tagging-and-versioning-docker-images/)

## Linting Nginx conf for CI

- [Automate Nginx conf file validation using Docker](https://medium.com/@devkamboj/automate-nginx-conf-file-validation-using-docker-261d7e2ef30c)
- [Validate your Nginx configuration files easily with Docker](https://dev.to/simdrouin/validate-your-nginx-configuration-files-easily-with-docker-4ihi)

## Stable Tags Scheme with Docker

To support stable tags for a given major and minor version, they have two sets of stable tags.

- `:prod` – a stable tag for the major version. prod will represent the “newest” or “latest” `prod.*` version.
- `:prod.262078741` a stable tag for version prod.262078741, allowing a developer to bind to updates of prod.262078741, and not be rolled forward to `prod.262078742`
- `:latest` which will point to the latest stable tag, no matter what the current major version is.

## Using Git Branch Effectively for features

- `master` branch is where the production code lives and final consumers of our application can interact with. Don't forget to add the [protection rules to your branch](https://spectralops.io/blog/how-to-set-up-git-branch-protection-rules/) like enabling the [**Require status checks before merging**](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule) and **enabling pull request reviews before merging**. This helps will disable GitHub pull request merge button when CI job fails. Remember to give whatever CI tool you are using access to your github. The CI service you use will ask your your github credentials
- `staging` branch is where stakeholders can play around and see newly developed features before that are released to the final customers. If the features are approved, then we can make a PR to merge that code to master for public to use
- In this [StackOverflow thread](https://stackoverflow.com/questions/65889090/git-branches-environments-development-process-for-ci-cd) people talk about branch practices too if u want to read
  The following script below will be an example of what you will do int terminal to set this up

```bash
git init
git add .
git status
git commit -m "first commit"
git remote add origin https://github.com/okpalaChidiebere/chirper-app-api-image-filter.git
git push -u origin master

git checkout -b staging
git push --set-upstream origin staging


# a developer can brach of staging and small changes to this branch. when they are ready to show the feature to stakeholder and are sure that the feature and codebase is stable in development that we can make a PR to merge to staging
git checkout -b some-feature-task staging

# we can take it one step further by creating a dev branch. But then the staging branch will be a clone of the master to make sure all of the code we are working on locally will also function while its deployed.
git checkout -b dev
git push --set-upstream origin dev

```
