FROM debian:9.5-slim

LABEL "com.github.actions.name"="Bash"
LABEL "com.github.actions.description"="Exposes a bash container for pipeline needs"
LABEL "com.github.actions.icon"="terminal"
LABEL "com.github.actions.color"="green"

LABEL "repository"="https://github.com/cujarrett/glimpse"
LABEL "homepage"="https://github.com/cujarrett/glimpse"
LABEL "maintainer"="Matt Jarrett <mjarrettdev@gmail.com>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
