#!/bin/sh

echo "Starting"
while ! nc -z mysql 3306; do
  sleep 0.1
done

echo "MySQL started"
npm run migrate:dev
npm run start:public    