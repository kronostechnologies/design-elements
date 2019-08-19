#!/usr/bin/env bash

extensions="scss"

if [[ "$1" == *"--ci" ]]; then
  stylelint --custom-formatter node_modules/stylelint-junit-formatter "./src/**/*.{${extensions}}" >build/lint/style/junit.xml
else
  stylelint ${stylelint_ci_options} "./src/**/*.{${extensions}}"
fi

stylelint "./style/**/*.${extensions}"
