const readLineSync = require('readline-sync')
const { execCmd } = require('./utils')

const commitMsg = readLineSync.question('commit message：', {
  defaultInput: ''
})

execCmd('git add .')
execCmd(`git commit -m "${commitMsg}"`)
execCmd('git push origin master')
