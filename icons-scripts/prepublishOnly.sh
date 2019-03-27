#!/usr/bin/env bash

svgo --config=../.svgo.yml -f ../src -o . --disable=removeViewBox --enable=removeDimensions
cp ../README.md .
