#!/usr/bin/env bash

svgo --config=../svgo.config.js -f ../src -o .
cp ../README.md .
