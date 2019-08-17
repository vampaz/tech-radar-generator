/**
 * This file is transpiled using val-loader, which interpolates in the static
 * data provided by the consumer of this library.
 */

module.exports = ({ data }) => ({ code: `
const { title, rings, blips: blipsJson } = ${JSON.stringify(data)}

blipsJson.forEach(blip => { blip.isNew = blip.isNew + '' })

module.exports = { title, rings, blipsJson }
` })

// const languagesFrameworks = require('../data/languages-and-frameworks.yml')
// const platforms = require('../data/platforms.yml')
// const techniques = require('../data/techniques.yml')
// const tools = require('../data/tools.yml')

// const rings = [
//   'ADOPT',
//   'EXPLORE',
//   'ENDURE',
//   'RETIRE'
// ]
// const inputData = [].concat(languagesFrameworks, platforms, techniques, tools)

// module.exports = { inputData, rings }
