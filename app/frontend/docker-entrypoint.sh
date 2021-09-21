#!/bin/bash

rsync -arv /home/app/node_modules /tmp/node_modules
exec npm start