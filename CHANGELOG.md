# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.16.0] - 2020-03-13
### Changed
- :lipstick: Adjusted footer styling

## [v0.15.1] - 2020-03-13
### Changed
- :arrow_up: Updated dependencies

## [v0.15.0] - 2020-02-23
### Added
- :sparkles: link to user's GitHub on any valid search

## [v0.14.1] - 2020-02-11
### Changed
- :arrow_up: Updates dependencies
- :bug: Bug on mobile where the search box auto prompted input causing the keyboard to pop up

## [v0.14.0] - 2020-01-18
### Changed
- :rocket: Migrated to AWS
- :rocket: Migrated to Circle CI for CI/CD
- :arrow_up: Updated dependencies

### Fixed
- :bug: Bug with app message logic

## [v0.13.2] - 2020-01-02
### Changed
- :arrow_down: Reverted updating dependencies due to SSL issue

## [v0.13.1] - 2020-01-01
### Changed
- :arrow_up: Updates dependencies

## [v0.13.0] - 2019-12-07
### Changed
- :arrow_up: Updates dependencies
- :sparkles: Updates corner link back to source code to animated corner Octocat

## [v0.12.0] - 2019-10-16
### Changed
- :arrow_up: Updates dependencies
- :alien: Updates CI/CD to latest GitHub Actions (.hcl -> .yml)

### Added
- :sparkles: Client side version number

## [v0.11.4] - 2019-07-10
### Changed
- :arrow_up: Updates dependencies

## [v0.11.3] - 2019-07-09
### Changed
- :arrow_up: Updates dependencies

## [v0.11.2] - 2019-04-22
### Fixed
- :bug: Demo search bug

## [v0.11.1] - 2019-04-21
### Fixed
- :bug: Empty search bug

## [v0.11.0] - 2019-04-20
### Changed
- :recycle: Breaks app into components
- :recycle: State management via React Hooks

## [v0.10.1] - 2019-03-10
### Changed
- :alien: Build script for Heroku changes

## [v0.10.0] - 2018-11-10
### Changed
- :arrow_up: Updates dependencies

## [v0.9.0] - 2018-09-01
### Changed
- :recycle: Demo username
- :recycle: Updated GitHub username and links

## [v0.8.4] - 2018-07-27
### Changed
- :arrow_down: Downgraded `query-string` to 5.1.1 to fix IE support

## [v0.8.3] - 2018-07-27
### Changed
- :lock: Hardening against url parameters and search input to only allow alpha numeric and hyphen as to
follow GitHub username rules
- :bug: Fixed bug where the app would continue to load when no results were found

## [v0.8.2] - 2018-07-27
### Added
- :lock: Hardening against url parameters and search input

## [v0.8.1] - 2018-07-27
### Changed
- :iphone: Fixed body of email when sharing results via email

## [v0.8.0] - 2018-07-26
### Added
- :lock: Sanitizing of input

## [v0.7.1] - 2018-07-26
### Changed
- :iphone: Styling on small displays and mobile

## [v0.7.0] - 2018-07-26
### Added
- :sparkles: Ability to share results on social networks and email

### Changed
- :recycle: Demo username

## [v0.6.0] - 2018-07-23
### Added
- :sparkles: Demo
- :lipstick: App context info

### Changed
- :bug: Fixed bug where if the user searched for a username and changed the searched username before the
results were displayed the results for the uncompleted search would still show up when the search
completed

## [v0.5.1] - 2018-07-21
### Changed
- :children_crossing: Fixed situation where if someone made a GitHub account in the last 20 days of December the years
will overlap on the X axis with the next year so I don't display the previous year as the first
year on the X axis

## [v0.5.0] - 2018-07-21
### Changed
- :iphone: Added applicable years to X axis and supports mobile displays when there is tight space along the
X axis situations

## [v0.4.0] - 2018-07-15
### Added
- :lipstick: Check to ensure no future dates are returned on the UI as the consumed
https://github-contributions-api.now.sh/ returns dates until the end of the current calendar year

## [v0.3.1] - 2018-07-12
### Added
- :children_crossing: Babel Polyfill to attempt fix for Internet Explorer not loading bug

## [v0.3.0] - 2018-07-10
### Added
- :lipstick: Footer
- :iphone: Styling support for mobile

### Changed
- :bug: Fixed bug in Y Axis when tick was less than 0 with more than two decimal places
- :recycle: App manifest and html name to Glimpse

## [v0.2.0] - 2018-07-08
### Changed
- :lipstick: Refined the look of the data displayed after a search

## [v0.1.0] - 2018-07-06
### Added
- :tada: Ability to search for user contributions by the enter key

[v0.16.0]: https://github.com/cujarrett/glimpse/compare/v0.15.1...v0.16.0
[v0.15.1]: https://github.com/cujarrett/glimpse/compare/v0.15.0...v0.15.1
[v0.15.0]: https://github.com/cujarrett/glimpse/compare/v0.14.1...v0.15.0
[v0.14.1]: https://github.com/cujarrett/glimpse/compare/v0.14.0...v0.14.1
[v0.14.0]: https://github.com/cujarrett/glimpse/compare/v0.13.2...v0.14.0
[v0.13.2]: https://github.com/cujarrett/glimpse/compare/v0.13.1...v0.13.2
[v0.13.1]: https://github.com/cujarrett/glimpse/compare/v0.13.0...v0.13.1
[v0.13.0]: https://github.com/cujarrett/glimpse/compare/v0.12.0...v0.13.0
[v0.12.0]: https://github.com/cujarrett/glimpse/compare/v0.11.4...v0.12.0
[v0.11.4]: https://github.com/cujarrett/glimpse/compare/v0.11.3...v0.11.4
[v0.11.3]: https://github.com/cujarrett/glimpse/compare/v0.11.2...v0.11.3
[v0.11.2]: https://github.com/cujarrett/glimpse/compare/v0.11.1...v0.11.2
[v0.11.1]: https://github.com/cujarrett/glimpse/compare/v0.11.0...v0.11.1
[v0.11.0]: https://github.com/cujarrett/glimpse/compare/v0.10.1...v0.11.0
[v0.10.1]: https://github.com/cujarrett/glimpse/compare/v0.10.0...v0.10.1
[v0.10.0]: https://github.com/cujarrett/glimpse/compare/v0.9.0...v0.10.0
[v0.9.0]: https://github.com/cujarrett/glimpse/compare/v0.8.4...v0.9.0
[v0.8.4]: https://github.com/cujarrett/glimpse/compare/v0.8.3...v0.8.4
[v0.8.3]: https://github.com/cujarrett/glimpse/compare/v0.8.2...v0.8.3
[v0.8.2]: https://github.com/cujarrett/glimpse/compare/v0.8.1...v0.8.2
[v0.8.1]: https://github.com/cujarrett/glimpse/compare/v0.8.0...v0.8.1
[v0.8.0]: https://github.com/cujarrett/glimpse/compare/v0.7.1...v0.8.0
[v0.7.1]: https://github.com/cujarrett/glimpse/compare/v0.7.0...v0.7.1
[v0.7.0]: https://github.com/cujarrett/glimpse/compare/v0.6.0...v0.7.0
[v0.6.0]: https://github.com/cujarrett/glimpse/compare/v0.5.1...v0.6.0
[v0.5.1]: https://github.com/cujarrett/glimpse/compare/v0.5.0...v0.5.1
[v0.5.0]: https://github.com/cujarrett/glimpse/compare/v0.4.0...v0.5.0
[v0.4.0]: https://github.com/cujarrett/glimpse/compare/v0.3.1...v0.4.0
[v0.3.1]: https://github.com/cujarrett/glimpse/compare/v0.3.0...v0.3.1
[v0.3.0]: https://github.com/cujarrett/glimpse/compare/v0.2.0...v0.3.0
[v0.2.0]: https://github.com/cujarrett/glimpse/compare/v0.1.0...v0.2.0
[v0.1.0]: https://github.com/cujarrett/glimpse/releases/tag/v0.1.0
