#!/usr/bin/env sh

# abort on errors
set -e

#clear already exist build dir
if [ -d "./dist/" ]; then
  rm -rf dist
fi

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B deploy-build
git add -A
git commit -m 'deploy'
git remote add deploy_origin https://github.com/SashaZel/malo_bot

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f deploy_origin deploy-build

cd -

cat << msgsss
Deploy success
msgsss