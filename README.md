# SurveysWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.15.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## If you have problems

If you have problems, due to compatibility issues with a version, do the following:

1. Run

`````
npm install --force

`````

## If you have problems running the `ng serve` command

Follow the steps:

1. Since the project contains a dockerfile, run the command:

`````
docker build -t angular-app .

`````
2. Once the image is built, run the following command:

`````

$ docker run -p 4200:4200 -v path-where you have the project:/app -v /app/node_modules angular-app

`````
