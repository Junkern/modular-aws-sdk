#!/bin/sh
wget -o- https://github.com/aws/aws-sdk-js/archive/master.zip
unzip master.zip

SOFTWARE=$1

node creator.js $SOFTWARE