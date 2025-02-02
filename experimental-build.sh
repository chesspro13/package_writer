cp ./src/pages/MainEditor.tsx.prompting ./src/pages/MainEditor.tsx
docker build . -t  "chesspro13/package-smith:experimental"
docker push "chesspro13/package-smith:experimental"
