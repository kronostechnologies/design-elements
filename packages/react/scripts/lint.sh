#!/usr/bin/env bash

set -e

tslint_code_ci_options=""
tslint_test_ci_options=""
if [[ "$1" == *"--ci" ]]; then
  tslint_code_ci_options="--format junit -o build/lint/ts-code/junit.xml"
  tslint_test_ci_options="--format junit -o build/lint/ts-test/junit.xml"
fi

extensions="ts,tsx"

mkdir -p build/lint/ts-code build/lint/ts-test build/lint/style
tslint -p tsconfig.json "src/**/*.{${extensions}}" "test/**/*.{${extensions}}" ${tslint_code_ci_options}
# TODO: Add once tests exists
#tslint -p test/tsconfig.json -c test/tslint.json "test/**/*.{${extensions}}" ${tslint_test_ci_options}

if [[ "$1" == *"--ci" ]]; then
  stylelint --custom-formatter node_modules/stylelint-junit-formatter "./src/**/*.{${extensions}}" >build/lint/style/junit.xml
else
  stylelint "./src/**/*.{${extensions}}"
fi
