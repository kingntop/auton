#!/bin/bash

cd /root/auton
echo "$PWD"
/usr/bin/npx playwright test comparison.spec.ts