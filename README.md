# Simple Sign-up

This is a demo project that showcases a typical sign-up form functionality built with [Angular 16.0.5](https://github.com/angular/angular-cli). The project demonstrates Angular form handling, observables, and HTTP request handling. The app is styled with [Tailwind CSS](https://tailwindcss.com/) for a modern and responsive user interface.

- Online demo: https://signup-form-blush.vercel.app

## Prerequisites

You will need to have the following software installed on your system before you can get started:

- Node.js (v18.16.0) and npm (v9.5.1): You can download Node.js from [here](https://nodejs.org/en/) and npm is included in the installation.
- Angular CLI: Install it via npm with `npm install -g @angular/cli`.

## Development server

Run `ng serve` to run a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

You can run the unit tests using the following npm scripts:

- `npm run test`: Launches the [Karma](https://karma-runner.github.io) test runner and runs all unit tests in the application in watch mode.

- `npm run test:ci`: Executes unit tests in a single run, generates a code coverage report, and uses a headless browser for testing. This command is designed to be used in continuous integration (CI) environments, where you need to get the test results once and the browser GUI is not necessary.

## Running end-to-end tests

You can run the E2E tests using the following npm scripts:

- `npm run e2e`: Runs the E2E tests using [Cypress](https://www.cypress.io/). The script launches an instance of the browser and interacts with the application, mimicking user behavior.

- `npm run cy:run`: Executes E2E tests using [Cypress](https://www.cypress.io/) in a headless browser, ideal for continuous integration (CI) environments. Please make sure that your application is running on `localhost:4200` before running this script, otherwise Cypress will not be able to access your application.

## Other Available Scripts

In the project directory, you can run the following commands:

- `npm run watch`: Continuously rebuilds the project when any source file changes. Useful for real-time development feedback.
- `npm run lint`: Analyzes the project's code for potential errors and deviations from code style guidelines using [ESLint](https://eslint.org/) linter.
- `npm run format`: Formats the code using [Prettier](https://prettier.io/), ensuring a consistent code style throughout the application.

## Ensuring Code Quality with Pre-Commit Hooks

- This project uses [lint-staged](https://github.com/okonet/lint-staged) to ensure code quality by running linter and formatter on staged files before committing.
- Lint-staged works hand-in-hand with pre-commit hooks, which are configured using [Husky](https://github.com/typicode/husky).
- The pre-commit hook triggers the execution of [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) on staged files. The ESlint will try to automatically fix the existent errors in `.ts` files and Prettier will format the `.ts`, `.html`, and `.scss` files, providing a consistent coding style across the project.
- If there are any issues, the commit will be blocked, and you'll need to fix the issues before committing again.

## Things to improve

As this is just a demo project, there are certain things that can be improved:

- more unit tests and e2e tests
- optimizing unit tests (avoiding boilerplate code)
- setting up CI with Github actions
- better a11y
- SEO optimization
- PWA support
- forgot password + login functionality
- more personalised UI

## Built With

- [Angular](https://angular.io/) - The web framework for building mobile and desktop web applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for building custom designs very fast
- [RxJS](https://rxjs.dev/) - A library for composing asynchronous and event-based programs by using observable sequences
