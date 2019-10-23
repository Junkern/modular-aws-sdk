const fs = require('fs')

const modifyPackageJson = (inPath, outPath, newName, newHomepage) => {
  const originalPackageJson = JSON.parse(fs.readFileSync(inPath).toString())
  let modifiedPackageJson = originalPackageJson
  delete modifiedPackageJson.devDependencies
  delete modifiedPackageJson.browser
  delete modifiedPackageJson.browserify
  delete modifiedPackageJson['react-native']
  delete modifiedPackageJson.scripts
  
  modifiedPackageJson.author.name = 'Martin Wentzel'
  modifiedPackageJson.author.email = ''
  modifiedPackageJson.author.url = ''

  modifiedPackageJson.name = newName
  modifiedPackageJson.homepage = newHomepage
  
  fs.writeFileSync(outPath, JSON.stringify(modifiedPackageJson, null, 2))
}

const modifyForPureNodejs = (inPath, outPath) => {
  const originalPackageJson = JSON.parse(fs.readFileSync(inPath).toString())

  let modifiedPackageJson = originalPackageJson
  delete modifiedPackageJson.devDependencies
  delete modifiedPackageJson.browser
  delete modifiedPackageJson.browserify
  delete modifiedPackageJson['react-native']

  modifiedPackageJson.author.name = 'Martin Wentzel'
  modifiedPackageJson.author.email = ''
  modifiedPackageJson.author.url = ''

  const newName = `modular-aws-sdk-pure-node`
  const newHomepage = `https://github.com/Junkern/aws-sdk-pure-nodejs`
  modifiedPackageJson.name = newName
  modifiedPackageJson.homepage = newHomepage
  modifiedPackageJson.bugs.url = `${newHomepage}/issues`

  delete modifiedPackageJson.dependencies.buffer
  delete modifiedPackageJson.dependencies.events
  delete modifiedPackageJson.dependencies.ieee754
  delete modifiedPackageJson.dependencies.jmespath
  delete modifiedPackageJson.dependencies.querystring
  delete modifiedPackageJson.dependencies.sax
  delete modifiedPackageJson.dependencies.url
  delete modifiedPackageJson.dependencies.uuid
  delete modifiedPackageJson.dependencies.xml2js

  const keys = Object.keys(modifiedPackageJson)
  keys.forEach((key) => {
    if (key.startsWith('_')) {
      delete modifiedPackageJson[key]
    }
  })


  fs.writeFileSync(outPath, JSON.stringify(modifiedPackageJson, null, 2))
}

module.exports = { modifyPackageJson, modifyForPureNodejs }
