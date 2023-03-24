#!/usr/bin/env bash

curl https://www.wikidata.org/wiki/Special:EntityData/Q146.json | jq --tab .entities.Q146 > cat.json
curl https://www.wikidata.org/wiki/Special:EntityData/Q5.json | jq --tab .entities.Q5 > human.json
