#!/usr/bin/env bash

set -e

###################
# Trap interrupts #
###################
trap ctrl_c INT

function ctrl_c() {
  info "Exiting due to interrupt"
  exit_error
}

###################
# Utils           #
###################

TTY_OR=
IF_TTY=" "
if test -t 1; then
  TTY_OR=" "
  IF_TTY=
  colors=$(tput colors)

  if test -n "$colors" && test $colors -ge 8; then
    bold="$(tput bold)"
    underline="$(tput smul)"
    standout="$(tput smso)"
    normal="$(tput sgr0)"
    black="$(tput setaf 0)"
    red="$(tput setaf 1)"
    green="$(tput setaf 2)"
    yellow="$(tput setaf 3)"
    blue="$(tput setaf 4)"
    magenta="$(tput setaf 5)"
    cyan="$(tput setaf 6)"
    white="$(tput setaf 7)"
  fi
fi

function error() {
  echo "${red}${bold}[ERROR]${normal} $1"
}

HELP=NO
VERSION_TAG=""

###################
# Parse arguments #
###################

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
  --tag)
    VERSION_TAG="${2//[[:space:]]/}"
    shift
    if [ -n "${VERSION_TAG}" ]; then
      shift
    fi
    ;;
  --help)
    HELP=YES
    shift
    ;;
  *)
    POSITIONAL+=("$1")
    shift
    ;;
  esac
done
set -- "${POSITIONAL[@]}"

function usage() {
  echo -e "Usage: doPublish -tag <version tag>"
  echo -e "Publish package from dist folder"
  echo -e ""
  echo -e "${bold}${green}REQUIRED ARGUMENTS${normal}"
  echo -e "\t--tag\t\t\t The version tag (latest, next, etc.)"
}

if [ ${HELP} == YES ]; then
  usage
  exit 0
fi

if [ -z "${VERSION_TAG}" ]; then
  usage
  error "Parameter --tag is required"
  exit 1
fi

mkdir -p dist
cp package.json dist/package.json
cd dist

# Perform release with npm as we don't want yarn's workspaces checks
npm publish --tag "$VERSION_TAG"
