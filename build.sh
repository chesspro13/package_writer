VERSION="0.1.4"

docker build . -t  "chesspro13/package-smith"
docker build . -t  "chesspro13/package-smith:v${VERSION}"

docker push "chesspro13/package-smith"
docker push "chesspro13/package-smith:v${VERSION}"