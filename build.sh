#!/bin/sh
export VERSION="0.1.7"

export VITE_API='https://pwapie.mauldin314.com'
export VITE_PING_DELAY=1
export VITE_AI_URL='https://packagesmith.mauldin314.com'


export VITE_MODE='local'
export VITE_VERSION="Version ${VERSION}-local" 
docker build --no-cache --build-arg VITE_MODE="${VITE_MODE}" --build-arg VITE_VERSION="${VITE_VERSION}" --build-arg VITE_API="${VITE_API}" --build-arg VITE_PING_DELAY="${VITE_PING_DELAY}" --build-arg VITE_AI_URL="${VITE_AI_URL}" -t "chesspro13/package-smith:v${VERSION}-local" .
docker push "chesspro13/package-smith:v${VERSION}-local"

export VITE_MODE='ai'
export VITE_VERSION="Version ${VERSION}-ai" 
docker build --build-arg VITE_MODE="${VITE_MODE}" --build-arg VITE_VERSION="${VITE_VERSION}" --build-arg VITE_API="${VITE_API}" --build-arg VITE_PING_DELAY="${VITE_PING_DELAY}" --build-arg VITE_AI_URL="${VITE_AI_URL}" -t "chesspro13/package-smith:v${VERSION}-ai" . 
docker push "chesspro13/package-smith:v${VERSION}-ai"

export VITE_MODE='prompt'
export VITE_VERSION="Version ${VERSION}-prompt" 
docker build --build-arg VITE_MODE="${VITE_MODE}" --build-arg VITE_VERSION="${VITE_VERSION}" --build-arg VITE_API="${VITE_API}" --build-arg VITE_PING_DELAY="${VITE_PING_DELAY}" --build-arg VITE_AI_URL="${VITE_AI_URL}" -t "chesspro13/package-smith:v${VERSION}-prompt" .
docker push "chesspro13/package-smith:v${VERSION}-prompt"