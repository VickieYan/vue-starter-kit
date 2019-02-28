const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')
const chalk = require('chalk')
const inquirer = require('inquirer')

// inquirer获取入口选项
const selectEntry = async() => {
  const fileNames = fs.readdirSync(path.join(__dirname, '../src/pages/'))
  const dirs = fileNames.filter(fileName => {
    const stat = fs.lstatSync(path.join(__dirname, '../src/pages/' + fileName))
    return stat.isDirectory()
  })
  const question = async() => {
    const result = await inquirer.prompt([{
      type: 'checkbox',
      name: 'entries',
      message: '请选择需要启动的项目',
      choices: dirs
    }])
    return result
  }
  const result = await question()
  while(!result.entries.length) {
    console.log(chalk.red('至少选择一个项目'))
    result = await question()
  }
  return result.entries
}

// 启动对应入口项目
const startUp = (entries) => {
  childProcess.execSync(`ENTRY='${entries.join(',')}' npm run dev`, {
    stdio: 'inherit'
  }, (error, stdout, stderr) => {
    console.log(`
      error: ${error}
      stdout: ${stdout}
      stderr: ${stderr}
    `)
  })
}

const main = async() => {
  const entry = await selectEntry()
  startUp(entry)
}

main()