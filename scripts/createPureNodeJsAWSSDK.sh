#/bin/sh
NEW_PACKAGE_NAME=modular-aws-sdk-pure-node

cp -r ./node_modules/aws-sdk ./$NEW_PACKAGE_NAME

cd $NEW_PACKAGE_NAME

rm -rf .vscode
rm -rf dist
rm -rf dist-tools
rm -rf scripts
rm -f browser.js
rm -f react-native.js
rm -f CHANGELOG.md
find ./lib -name "browser*js" -delete

node ../scripts/changePureNodeJsSdk.js $NEW_PACKAGE_NAME