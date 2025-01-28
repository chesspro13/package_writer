VERSION="0.1.5"

cp ./src/pages/MainEditor.tsx.ai-ver ./src/pages/MainEditor.tsx
docker build . -t  "chesspro13/package-smith:experimental"
docker push "chesspro13/package-smith:experimental"
