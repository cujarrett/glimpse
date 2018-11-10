# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.9.1] - 2018-11-10
### Fixed
- Vulnerability with dependency

## [0.9.0] - 2018-09-01
### Changed
- Demo username
- Updated GitHub username and links

## [0.8.4] - 2018-07-27
### Changed
- Downgraded `query-string` to 5.1.1 for IE support

## [0.8.3] - 2018-07-27
### Changed
- Hardening against url parameters and search input to only allow alpha numeric and hyphen as to
follow GitHub rules
- Fixed bug where the app would continue to load when no results were found

## [0.8.2] - 2018-07-27
### Added
- Hardening against url parameters and search input

## [0.8.1] - 2018-07-27
### Changed
- Fixed body of email when sharing results via email

## [0.8.0] - 2018-07-26
### Added
- Sanitizing of input

## [0.7.1] - 2018-07-26
### Changed
- Styling on small displays and mobile

## [0.7.0] - 2018-07-26
### Added
- Ability to share results on social networks and email

### Changed
- Demo username

## [0.6.0] - 2018-07-23
### Added
- Demo
- App context info

### Changed
- Fixed bug where if the user searched for a username and changed the searched username before the
results were displayed the results for the uncompleted search would still show up when the search
completed

## [0.5.1] - 2018-07-21
### Changed
- Fixed situation where if someone made a GitHub account in the last 20 days of December the years
will overlap on the X axis with the next year so I don't display the previous year as the first
year on the X axis

## [0.5.0] - 2018-07-21
### Changed
- Added applicable years to X axis and supports mobile displays when there is tight space along the
X axis situations

## [0.4.0] - 2018-07-15
### Added
- Check to ensure no future dates are returned on the UI as the consumed
https://github-contributions-api.now.sh/ returns dates until the end of the current calendar year

## [0.3.1] - 2018-07-12
### Added
- Babel Polyfill to attempt fix for Internet Explorer not loading bug

## [0.3.0] - 2018-07-10
### Added
- Footer
- Styling support for mobile

### Changed
- Fixed bug in Y Axis when tick was less than 0 with more than two decimal places
- App manifest and html name to Glimpse

## [0.2.0] - 2018-07-08
### Changed
- Refined the look of the data displayed after a search

## [0.1.0] - 2018-07-06
### Added
- Ability to search for user contributions by the enter key

[Unreleased]: https://github.com/cujarrett/glimpse/compare/v0.9.1...master
[0.9.1]: https://github.com/cujarrett/glimpse/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/cujarrett/glimpse/compare/v0.8.4...v0.9.0
[0.8.4]: https://github.com/cujarrett/glimpse/compare/v0.8.3...v0.8.4
[0.8.3]: https://github.com/cujarrett/glimpse/compare/v0.8.2...v0.8.3
[0.8.2]: https://github.com/cujarrett/glimpse/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/cujarrett/glimpse/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/cujarrett/glimpse/compare/v0.7.1...v0.8.0
[0.7.1]: https://github.com/cujarrett/glimpse/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/cujarrett/glimpse/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/cujarrett/glimpse/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/cujarrett/glimpse/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/cujarrett/glimpse/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/cujarrett/glimpse/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/cujarrett/glimpse/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/cujarrett/glimpse/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/cujarrett/glimpse/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/cujarrett/glimpse/releases/tag/v0.1.0
