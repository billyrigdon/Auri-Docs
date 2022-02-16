cd ..
rm -r ./api/build
cd ./client
npm install
npm run build
mv ./build ../api/build
cd ../api
docker build -t billyrigdoniii/auri-docs:latest .
docker kill AuriDocs
docker rm AuriDocs
docker push billyrigdoniii/auri-docs:latest