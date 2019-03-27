#!/usr/bin/env bash

svgo --config=../../icons-scripts/custom-svgo.yml -f ./src -o ./dist --disable=removeViewBox --enable=removeDimensions
