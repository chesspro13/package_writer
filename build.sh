VERSION="0.1.5"

docker build . -t  "chesspro13/package-smith"
# Build Local
docker build . -t  "chesspro13/package-smith:v${VERSION}"

# Move file around to build for AI
mv ./src/pages/MainEditor.tsx ./src/pages/MainEditor.tsx.local-ver
mv ./src/pages/MainEditor.tsx.ai-ver ./src/pages/MainEditor.tsx

# Build AI
docker build . -t  "chesspro13/package-smith:v${VERSION}-ai"

# Move back to local
mv ./src/pages/MainEditor.tsx ./src/pages/MainEditor.tsx.ai-ver
mv ./src/pages/MainEditor.tsx.local-ver ./src/pages/MainEditor.tsx

docker push "chesspro13/package-smith"
docker push "chesspro13/package-smith:v${VERSION}"
docker push "chesspro13/package-smith:v${VERSION}-ai"