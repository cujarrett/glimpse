---

<p align="center" class="toc">
   <strong><a href="#setup">Setup</a></strong>
   |
   <strong><a href="#running-lintingtests">Running linting/tests</a></strong>
</p>

---

## Setup
Setup and use requires [Git](https://git-scm.com/),
[Node JS](https://nodejs.org/en/), and a text editor such as
[VS Code](https://code.visualstudio.com/).

If you're on a Mac, I'd suggest using [Homebrew](https://brew.sh/) for installing Node and Git.

### Cloning & Dependency Installations
```sh
git clone https://github.com/cujarrett/glimpse.git
cd glimpse
npm install
```

## Running Linting/Tests

### Run Linting
Finds problematic patterns or code that doesn’t adhere to certain style guidelines
```sh
npm run lint
```

### Fix linting Errors (Where Possible)
```sh
npm run fix-lint
```

### Run Tests
Runs the app in the development mode.
```sh
npm run test
```

### Start local server to see app during development
The page will reload if you make edits. You will also see any lint errors in the console.
```sh
npm run start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
```sh
npm run build
```

