const path = require('path')
const fs = require('fs')
const { modifyForPureNodejs } = require('./changePackageJson')

const newName = process.argv[2]
const packageJsonPath = path.join(__dirname, '..',newName, 'package.json')
modifyForPureNodejs(packageJsonPath, packageJsonPath)

 // README
 const readmeContents = `# ${newName}
 This repository was created by https://github.com/Junkern/modular-aws-sdk
 `
 fs.writeFileSync(path.join(__dirname, '..',newName, 'README.md'), readmeContents)
