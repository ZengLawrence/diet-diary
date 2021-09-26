#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo $DIR
shopt -s expand_aliases
source $DIR/bash.profile
antlr4 -Dlanguage=JavaScript $DIR/food-description/FoodDescription.g4 -o .
