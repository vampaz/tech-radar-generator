const webpack = require('webpack')
const path = require('path')
const Ajv = require('ajv')

const schema = require('./schema.json')
const config = require('./webpack.config')

const ajv = new Ajv({ allErrors: true })

/**
 * @typedef RadarOptions
 * @property {('development'|'production')} [mode="production"] The webpack mode
 */

/**
 * Generates a static Thoughtworks Radar.
 * @param {object} data The data for the radar
 * @param {string} outputArg The relative or absolute path to the output directory
 * @param {RadarOptions} [options] The radar options
 * @return {Promise<string>} A promise resolving to the output directory path
 */
function techRadarGenerator (data, outputArg, { mode = 'production' } = {}) {
  return new Promise((resolve, reject) => {
    const valid = ajv.validate(schema, data)
    if (!valid) {
      const err = new Error(`Config did not match JSON schema: ${ajv.errorsText()}`)
      return reject(err)
    }
    const outputPath = path.resolve(outputArg)
    config.mode = mode
    config.output.path = outputPath
    const valLoader = config.module.rules.find(
      el => el.use && el.use.loader && el.use.loader === require.resolve('val-loader')
    )
    valLoader.use.options.data = data

    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || stats.toString({ colors: true }))
      } else {
        resolve(outputPath)
      }
    })
  })
}

module.exports = techRadarGenerator
