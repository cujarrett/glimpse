# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- Updates demo username

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

[Unreleased]: https://github.com/matt-jarrett/glimpse/compare/v0.8.0...master
[0.8.0]: https://github.com/matt-jarrett/glimpse/compare/v0.7.1...v0.8.0
[0.7.1]: https://github.com/matt-jarrett/glimpse/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/matt-jarrett/glimpse/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/matt-jarrett/glimpse/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/matt-jarrett/glimpse/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/matt-jarrett/glimpse/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/matt-jarrett/glimpse/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/matt-jarrett/glimpse/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/matt-jarrett/glimpse/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/matt-jarrett/glimpse/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/matt-jarrett/glimpse/releases/tag/v0.1.0
