const ClientCreator = require('./aws-sdk-js-master/dist-tools/client-creator')
const fsExtra = require('fs-extra')
const fs = require('fs')
const path = require('path')
const metadata = require('./aws-sdk-js-master/apis/metadata')
const { modifyPackageJson } = require('./own_scripts/changePackageJson')

const cc = new ClientCreator()

const PATH_TO_AWS_SDK = 'aws-sdk-js-master'

const run = async () => {
  const serviceToUse = process.argv[2]
  const NEW_MODULE_FOLDER = serviceToUse
  if (typeof metadata[serviceToUse] === 'undefined') {
    return console.error(`"${serviceToUse}" does not exist`)
  }
  const uppercaseName = metadata[serviceToUse].name

  // create the folder
  fsExtra.mkdirSync(path.join(__dirname, NEW_MODULE_FOLDER))

  // change and copy package.json
  const newName = `modular-aws-sdk-${serviceToUse}`
  const newHomepage = `https://github.com/Junkern/${newName}`
  modifyPackageJson(path.join(__dirname, PATH_TO_AWS_SDK, 'package.json'), path.join(__dirname, NEW_MODULE_FOLDER, 'package.json'), newName, newHomepage)

  // copy needed dependencies
  // await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'package.json'), path.join(__dirname, NEW_MODULE_FOLDER, 'package.json'));
  await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'NOTICE.txt'), path.join(__dirname, NEW_MODULE_FOLDER, 'NOTICE.txt'));
  await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'LICENSE.txt'), path.join(__dirname, NEW_MODULE_FOLDER, 'LICENSE.txt'));
  await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'index.d.ts'), path.join(__dirname, NEW_MODULE_FOLDER, 'index.d.ts'));
  await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'lib'), path.join(__dirname, NEW_MODULE_FOLDER, 'lib'));
  await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'vendor'), path.join(__dirname, NEW_MODULE_FOLDER, 'vendor'));

  // copy needed files for clients folder
  await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'clients', 'sts.js'), path.join(__dirname, NEW_MODULE_FOLDER, 'clients', 'sts.js'));
  await fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'clients', 'cognitoidentity.js'), path.join(__dirname, NEW_MODULE_FOLDER, 'clients', 'cognitoidentity.js'));

  // all.js file
  const allJs = cc.generateAllServicesSource([serviceToUse], 'all');
  fs.writeFileSync(path.join(__dirname, NEW_MODULE_FOLDER, 'clients', 'all.js'), allJs.code)
  // all.d.ts file
  const allDTsFileContents = `export import ${uppercaseName} = require('./${serviceToUse}');`
  fs.writeFileSync(path.join(__dirname, NEW_MODULE_FOLDER, 'clients', 'all.d.ts'), allDTsFileContents)

  // ec2.js
  const clientFile = cc.generateClientFileSource({ name: uppercaseName }, null);
  fsExtra.copy(clientFile.path, path.join(__dirname, NEW_MODULE_FOLDER, 'clients', `${clientFile.service}.js`))
  // ec2.d.ts
  const dTsFilePath = `${clientFile.path.slice(0, clientFile.path.length - 2)}d.ts`
  fsExtra.copy(dTsFilePath, path.join(__dirname, NEW_MODULE_FOLDER, 'clients', `${clientFile.service}.d.ts`))


  // copy needed files for api folder
  const neededApiFiles = cc.getAllApiFilenamesForService(serviceToUse);
  for (const version in neededApiFiles.versions) {
    if (!neededApiFiles.versions.hasOwnProperty(version)) {
      continue;
    }
    const files = Object.keys(neededApiFiles.versions[version]);
    files.forEach((file) => {
      fsExtra.copy(path.join(__dirname, PATH_TO_AWS_SDK, 'apis', `${neededApiFiles.versions[version][file]}.json`), path.join(__dirname, NEW_MODULE_FOLDER, 'apis', `${neededApiFiles.versions[version][file]}.json`))
    })
  }
}

run()