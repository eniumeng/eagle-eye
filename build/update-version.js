const fs = require('fs')
const path = require('path')
const readLineSync = require('readline-sync')
const package = require('../package.json')

const currentVersion = package.version

const currentVersionArr = currentVersion.split('.')

currentVersionArr[2] = +currentVersionArr[2] + 1

let nextVersion = currentVersionArr.join('.')

nextVersion = readLineSync.question(`使用版本号(${nextVersion}): `, {
  defaultInput: nextVersion
})

package.version = nextVersion

fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(package, null, 2) + '\n')
