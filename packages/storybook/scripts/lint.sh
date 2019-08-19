#!/usr/bin/env bash

set -e

tslint_code_ci_options=""
if [[ "$1" == *"--ci" ]]; then
  tslint_code_ci_options="--format junit -o build/lint/ts-code/junit.xml"
fi

extensions="ts,tsx"

mkdir -p build/lint/ts-code build/lint/ts-test build/lint/style
tslint -p tsconfig.json "stories/**/*.{${extensions}}" ${tslint_code_ci_options}
