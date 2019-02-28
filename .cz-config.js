'use strict'
const fs = require('fs')
const path = require('path')

const fileNames = fs.readdirSync(path.join(__dirname, './src/pages/'))
const dirs = fileNames.filter(fileName => {
  const stat = fs.lstatSync(path.join(__dirname, './src/pages/' + fileName))
  return stat.isDirectory()
})

module.exports = {
  types: [
    { value: 'WIP', name: '日常开发' },
    { value: 'fix', name: '修复bug' },
    { value: 'docs', name: '修改文档' },
    { value: 'style', name: '修改格式' },
    { value: 'refactor', name: '代码重构' },
  ],
  scopes: dirs,
  messages: {
    type: '请选择本次提交的类型(必选):',
    scope: '\n选择本次修改的模块(必选):',
    subject: '本次修改简要说明(必填):\n',
    body: '详细说明，用 "|" 来表示换行(非必填):\n',
    confirmCommit: '确认以上信息咩 ^__^?',
  },
  allowCustomScopes: false,
  subjectLimit: 100,
}
