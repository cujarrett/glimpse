---

<p align="center" class="toc">
   <strong><a href="#how-do-i-get-started">How Do I Get Started?</a></strong>
   |
  <strong><a href="#setup">Setup</a></strong>
   |
   <strong><a href="#running-lintingtests">Running Linting/Tests</a></strong>
   |
   <strong><a href="#build-for-production">Build for Production</a></strong>
</p>

---

## How Do I Get Started?
Glimpse is a React JS web app using web services to collect metrics and display that data on
beautiful charts.

Thanks for the interest, really. There are bugs and features in the [issues](https://github.com/cujarrett/glimpse/issues).
A good place to start is issues with the [beginner-friendly](https://github.com/cujarrett/glimpse/issues?q=is%3Aissue+is%3Aopen+label%3Abeginner-friendly)
label. I ask that any new features align to the long term vision of the project:

**A simple way on any device to quickly see [Open Source Software](https://en.wikipedia.org/wiki/Open-source_software)
(OSS) contributions, info on how the contributions, and how it impacts the larger OSS community.**

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

## Build for Production
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
```sh
npm run build
```

