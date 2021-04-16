const readLineSync = require('readline-sync')
const { execCmd } = require('./utils')

const commitMsg = readLineSync.question('commit message：', {
  defaultInput: ''
})

execCmd(`git add . && git commit -m "${commitMsg}" && git push origin master`)
