#!/usr/bin/env bash

./antlr4/gradlew -p ./antlr4 clean generateJsTarget

if [ ! -d "./src/generated/parser" ] 
then
    mkdir -p ./src/generated/parser
fi
cp ./antlr4/lib/build/js/*.js ./src/generated/parser/