VERSION="0.1.5"

# Move file around to build for AI
cp ./src/pages/MainEditor.tsx.ai-ver ./src/pages/MainEditor.tsx
docker build . -t  "chesspro13/package-smith:v${VERSION}-ai"

# Move file around to build for Local
cp ./src/pages/MainEditor.tsx.local-ver ./src/pages/MainEditor.tsx
docker build . -t  "chesspro13/package-smith"
docker build . -t  "chesspro13/package-smith:v${VERSION}-local"

docker push "chesspro13/package-smith"
docker push "chesspro13/package-smith:v${VERSION}-local"
docker push "chesspro13/package-smith:v${VERSION}-ai"