#!/usr/bin/env bash

mvn clean package -f ./antlr4/food-description/pom.xml
if [ ! -d "./src/generated/parser" ] 
then
    mkdir -p ./src/generated/parser
fi
cp ./antlr4/food-description/target/js/*.js ./src/generated/parser/