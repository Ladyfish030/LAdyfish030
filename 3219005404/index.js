var nodejieba = require('nodejieba')

var fs = require('fs')
var data = fs.readFileSync('orig.txt')
console.log(data)
var result = nodejieba.cut(data.toString())
console.log(result)
