#!/usr/bin/env bash

mvn clean package -f ./antlr4/food-description/pom.xml
if [ ! -d "./gen-src/parser" ] 
then
    mkdir -p ./gen-src/parser
fi
cp ./antlr4/food-description/target/js/*.js ./gen-src/parser/