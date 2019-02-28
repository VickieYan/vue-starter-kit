class MyPlugin {
  constructor(option) {
    this.option = {
      rule: '**/main.js',
      root: 'src/pages',
      filename: '{{foldername}}/index.html'
    }
  }
  apply(compiler) {
    const entries = compiler.options.entry
    console.log('进入 MyPlugin')
    console.log(process.cwd())
  }
}

module.exports = MyPlugin