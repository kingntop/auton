#!/bin/sh
directory='/home/auton/playwright/auton/public'
max_usage=20
goal_usage=10
[ -d "$directory" ] || exit 1
[ "$max_usage" -gt "$goal_usage" ] || exit 1
[ "$( df --output=pcent $directory | \
    grep -Ewo '[0-9]+' )" -ge "$max_usage" ] || exit 0
dev_used="$( df -B 1K --output=used $directory | \
    grep -Ewo '[0-9]+' )"
goal_usage="$( printf "%.0f" \
    $( echo ".01 * $goal_usage * \
    $( df -B 1K --output=size $directory | \
        grep -Ewo '[0-9]+' )" | bc ) )"
echo "$( find $directory -type f -printf '%Ts,%k,\047%p\047\n' )" | \
    sort -k1 | \
        awk -F, -v goal="$(($dev_used-$goal_usage))" '\
            (sum+$2)>goal{printf "%s ",$3; exit} \
            (sum+$2)<=goal{printf "%s ",$3}; {sum+=$2}' | \
                xargs rm