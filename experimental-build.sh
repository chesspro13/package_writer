VERSION="0.1.5"

docker build . -t  "chesspro13/package-smith:experimental"
docker push "chesspro13/package-smith:experimental"
