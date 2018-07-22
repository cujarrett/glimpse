![logo](./media/glimpse-logo.png)
[![Build Status](https://travis-ci.org/matt-jarrett/glimpse.svg?branch=master)](https://travis-ci.org/matt-jarrett/glimpse)

## [www.glimpse.ninja](https://www.glimpse.ninja/)

## What's it do?
![demo](./media/demo.gif)
It's a React JS web app to show GitHub user metrics on beautiful graphs using Uber's awesome
[React VIS](https://github.com/uber/react-vis/blob/master/README.md) library.

## Developer Setup
Setup and use requires [Git](https://git-scm.com/),
[Node JS (8.X.X or later)](https://nodejs.org/en/), and a text editor such as
[VS Code](https://code.visualstudio.com/).

#### Cloning & Dependency Installations
```sh
git clone https://github.com/matt-jarrett/glimpse.git
cd glimpse
npm install
```

## Developer Use
#### Run Linting
Finds problematic patterns or code that doesn’t adhere to certain style guidelines
```sh
npm run lint
```

#### Run linting and fix errors
```sh
npm run fix-lint
```

#### Run tests
Runs the app in the development mode.
```sh
npm run test
```

#### Run Continuous Integration pipeline

Runs linting and tests
```sh
npm run ci
```

#### Start local server to see app during development
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
```sh
npm run start
```

#### Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
```sh
npm run build
```

Made with :heart:, JavaScript, and GitHub.
