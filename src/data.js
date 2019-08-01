const languagesFrameworks = require('../data/languages-and-frameworks.yml')
const platforms = require('../data/platforms.yml')
const techniques = require('../data/techniques.yml')
const tools = require('../data/tools.yml')

const rings = [
  'ADOPT',
  'EXPLORE',
  'ENDURE',
  'RETIRE'
]

const inputData = [].concat(languagesFrameworks, platforms, techniques, tools)

module.exports = { inputData, rings }
