const prodConfig = require('./webpack.config.prod.js')
const path = require('path')

const libConfig = Object.assign({}, prodConfig, {
  entry: path.resolve('src','ExportEditorApp.js'),
  output: Object.assign({}, prodConfig.output, {
    path: path.resolve('lib'),
    filename: 'JsEditor.js'
  })
})

module.exports = libConfig
