VERSION 0.8

FROM docker.io/library/node:22-alpine

WORKDIR /repo

deps:
    COPY . .
    RUN npm ci

build:
    FROM +deps
    RUN npm run build

save:
    FROM +build
    SAVE ARTIFACT build/* AS LOCAL artifact/

all:
    BUILD +save