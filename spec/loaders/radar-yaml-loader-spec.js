const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const Memoryfs = require('memory-fs')

function createCompiler (fixture, options = {}) {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.yml$/,
        use: {
          loader: path.resolve(__dirname, '../../loaders/radar-yaml-loader.js')
        }
      }]
    }
  })

  compiler.outputFileSystem = new Memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors))

      resolve(stats)
    })
  })
}

describe('radar-yaml-loader', () => {
  ['example-simple'].forEach((fixture) => {
    it(`transforms ${fixture}`, async () => {
      const stats = await createCompiler(`./${fixture}.yml`)
      const output = stats.toJson().modules[0].source

      const outputJson = JSON.parse(fs.readFileSync(
        path.join(__dirname, `${fixture}.json`), 'utf8'
      ))
      expect(output).toBe(`module.exports = ${JSON.stringify(outputJson)}`)
    })
  })
})
