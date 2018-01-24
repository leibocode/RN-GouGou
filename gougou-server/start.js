//入口文件
const{ resolve  } =require('path')
const r =path=>resolve(__dirname,path)

require('babel-register')
require('./app')