/**
 * A script which generates a static build of the Thoughtworks Radar.
 */
const webpack = require('webpack')

const config = require('./webpack.config')
const dist = './dist'

module.exports = ({ mode }) => new Promise((resolve, reject) => {
  webpack({ ...config, mode }, (err, stats) => {
    if (err || stats.hasErrors()) {
      reject(err || stats.toString({ colors: true }))
    } else {
      resolve(dist)
    }
  })
})
