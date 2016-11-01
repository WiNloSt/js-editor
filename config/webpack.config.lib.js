const prodConfig = require('./webpack.config.prod.js')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const libConfig = Object.assign({}, prodConfig, {
  entry: path.resolve('src','ExportEditorApp.js'),
  output: Object.assign({}, prodConfig.output, {
    path: path.resolve('lib'),
    filename: 'index.js'
  })
})

libConfig.plugins[libConfig.plugins.length - 1] = new ExtractTextPlugin('style.css')

module.exports = libConfig
