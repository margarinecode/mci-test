git fetch
TAG=$(git describe --tags)
ENVIRONMENT=$1
STAGE_STR="stage"
EDGE="latest"
if [ "$ENVIRONMENT" = "$STAGE_STR" ];
then
  EDGE="beta"
fi
git checkout $TAG
echo $ENVIRONMENT
if [ "$ENVIRONMENT" = "$STAGE_STR" ];
then
  docker build . -t mci-core:$TAG-$ENVIRONMENT --build-arg="ENVIRONMENT=$ENVIRONMENT" --platform linux/amd64
  docker tag mci-core:$TAG-$ENVIRONMENT asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$TAG-$ENVIRONMENT
  docker push asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$TAG-$ENVIRONMENT
  docker tag mci-core:$TAG-$ENVIRONMENT asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$EDGE
  docker push asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$EDGE
else 
  ENVIRONMENT="prod"
  docker build . -t mci-core:$TAG --platform linux/amd64
  docker tag mci-core:$TAG asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$TAG
  docker push asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$TAG
  docker tag mci-core:$TAG asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$EDGE
  docker push asia-southeast2-docker.pkg.dev/beaming-sunset-394713/mediacloud/mci-core:$EDGE
fi
git checkout main