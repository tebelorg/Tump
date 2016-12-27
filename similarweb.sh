#!/bin/bash
#script to process output from scraplist.js using similarweb.js ~ tebel.sg


while read -r line; do
	casperjs similarweb.js $line
done < "scraplist.csv"
