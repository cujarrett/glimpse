![logo](./media/glimpse-logo.png)
<h2 align="center">A React JS web app to show GitHub user contribution metrics</h2>
<h3 align="center"><b><a href="https://www.glimpse.ninja/">www.glimpse.ninja</a></h3>

[![Build Status](https://travis-ci.org/cujarrett/glimpse.svg?branch=master)](https://travis-ci.org/cujarrett/glimpse)
## What's it do?
![demo](./media/demo.gif)
It's a React JS web app to show GitHub user metrics on beautiful graphs using Uber's awesome
[React VIS](https://github.com/uber/react-vis/blob/master/README.md) library.

## Developer Setup & Use
Setup and use requires [Git](https://git-scm.com/),
[Node JS (8.X.X or later)](https://nodejs.org/en/), and a text editor such as
[VS Code](https://code.visualstudio.com/).

If you're on a Mac, I'd suggest using [Homebrew](https://brew.sh/) for installing the required
software listed in Setup.

### Cloning & Dependency Installations
```sh
git clone https://github.com/cujarrett/glimpse.git
cd glimpse
npm install
```

### Run Linting
Finds problematic patterns or code that doesn’t adhere to certain style guidelines
```sh
npm run lint
```

### Run linting and fix errors
```sh
npm run fix-lint
```

### Run tests
Runs the app in the development mode.
```sh
npm run test
```

### Run Continuous Integration pipeline

Runs linting and tests
```sh
npm run ci
```

### Start local server to see app during development
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.
```sh
npm run start
```

### Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
```sh
npm run build
```

Made with :heart:, JavaScript, and GitHub.
