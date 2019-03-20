#!/usr/bin/env bash

svgo -f ./src -o ./dist --disable=removeViewBox --enable=removeDimensions --enable=removeUselessStrokeAndFill
