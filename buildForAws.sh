#!/bin/sh

zip -r -q ../beanstalk-db-test.zip .
zip -d -q ../beanstalk-db-test.zip .git/\*
zip -d -q ../beanstalk-db-test.zip .env
zip -d -q ../beanstalk-db-test.zip node_modules/\*