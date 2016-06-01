#!/bin/bash
set -e

rm -rf node_modules

source ~/.nvm/nvm.sh
set -x
nvm use
npm version "$GO_PIPELINE_LABEL"

npm publish
