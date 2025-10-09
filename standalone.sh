#!/bin/sh
export VERSION="0.2"

export VITE_API='https://pop-os.local/api'
export VITE_PING_DELAY=1
export VITE_AI_URL='http://localhost:11434'

export VITE_MODE='ai'
export VITE_VERSION="0.2-standalone"
docker build --build-arg VITE_MODE="${VITE_MODE}" --build-arg VITE_VERSION="${VITE_VERSION}" --build-arg VITE_API="${VITE_API}" --build-arg VITE_PING_DELAY="${VITE_PING_DELAY}" --build-arg VITE_AI_URL="${VITE_AI_URL}" -t "chesspro13/package-smith:v${VERSION}-standalone" .
