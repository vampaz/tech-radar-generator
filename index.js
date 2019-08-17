const webpack = require('webpack')

const config = require('./webpack.config')

/**
 * @typedef RadarOptions
 * @property {('development'|'production')} [mode="production"] The webpack mode
 * @property {object} data The JSON data for the radar
 * @property {string} string The path to the output directory
 */

/**
 * Generates a static Thoughtworks Radar.
 * @param {RadarOptions} options The radar options
 * @return {Promise<string>} A promise resolving to the output directory path
 */
module.exports = ({ mode, data, outputDir }) => new Promise((resolve, reject) => {
  config.mode = mode || 'production'
  config.output.path = outputDir
  const valLoader = config.module.rules.find(
    el => el.use && el.use.loader && el.use.loader === 'val-loader'
  )
  valLoader.use.options.data = JSON.parse(data)

  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      reject(err || stats.toString({ colors: true }))
    } else {
      resolve(outputDir)
    }
  })
})
