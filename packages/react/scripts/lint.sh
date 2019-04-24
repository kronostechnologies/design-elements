#!/usr/bin/env bash

eslint --ext .jsx,.js src

stylelint "./src/**/*.js"
stylelint "./src/**/*.jsx"
