const { exec } = require('child_process')
const path = require('path')

function execCmd (cmd) {
  exec(cmd, { cwd: path.join(process.cwd(), '.') }, (err, stdout, stderr) => {
    if(err) {
      console.log(err)

      return
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`)
    } else {
      console.log(`stdout: ${stdout}`)
    }
  })
}

module.exports = {
  execCmd
}
