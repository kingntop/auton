#!/bin/bash

cd /mnt/c/ubuntu/auton/new-project
echo "$PWD"
/home/stmlymc/.nvm/versions/node/v16.15.0/bin/npx playwright test auton.spec.ts
