#!/bin/sh
df -H | grep '/dev/sda3' | awk '{ print $5 " " $1 }' | while read output;
do
  echo $output
  usep=$(echo $output | awk '{ print $1}' | cut -d'%' -f1  )
  partition=$(echo $output | awk '{ print $2 }' )
  if [ $usep -ge 10 ]; then
    echo "Running out of space \"$partition ($usep%)\" on $(hostname) as on $(date)" 
    cd /home/auton/playwright/auton/public
    ls -1t | tail -n +11 | xargs rm
  fi
done