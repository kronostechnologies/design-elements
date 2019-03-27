#!/usr/bin/env bash

svgo --config=./.svgo.yml -f ./src -o ./dist --disable=removeViewBox --enable=removeDimensions
