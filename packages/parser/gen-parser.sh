#!/usr/bin/env bash

./antlr4/gradlew -p ./antlr4 clean generateJsTarget

cp ./antlr4/lib/build/js/*.js .