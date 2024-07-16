#!/bin/bash

text="J225 $1 is now ALARM: usage is over $2"

curl -X POST -H 'Content-type: application/json' --data '{"text":$text"}' https://hooks.slack.com/services/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

echo $text >"/home/user/day2/monitoring/$(date +"%Y%m%d-%H%M%S")"
