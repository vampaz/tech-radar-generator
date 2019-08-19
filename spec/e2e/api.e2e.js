const fs = require('fs')

const tmp = require('tmp')

const techRadarGenerator = require('../../')
const exampleData = require('../../example-data')

describe('Node API end-to-end', () => {
  let tmpDir
  let originalTimeout

  beforeEach(() => {
    tmpDir = tmp.dirSync()
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    tmpDir.removeCallback()
  })

  it('bundles to a directory', () => {
    return techRadarGenerator(exampleData, tmpDir.name, { mode: 'development' })
      .then(dist => {
        expect(dist).toBe(tmpDir.name)
        const outputFiles = fs.readdirSync(tmpDir.name)
        expect(outputFiles.includes('index.html')).toBe(true)
        expect(outputFiles.includes('error.html')).toBe(true)
        expect(outputFiles.includes('images')).toBe(true)
        expect(outputFiles.findIndex((f) => f.match(/^common\..*\.css/))).not.toBe(-1)
        expect(outputFiles.findIndex((f) => f.match(/^common\..*\.js/))).not.toBe(-1)
        expect(outputFiles.findIndex((f) => f.match(/^main\..*\.css/))).not.toBe(-1)
        expect(outputFiles.findIndex((f) => f.match(/^main\..*\.js/))).not.toBe(-1)
      })
  })

  it('fails when the data is bad', () => {
    return techRadarGenerator({ bad: 'data' }, tmpDir.name, { mode: 'development' })
      .catch(e => {
        expect(e.message).toContain('Config did not match JSON schema')
        return 'ok'
      })
      .then((res) => {
        if (res !== 'ok') {
          throw new Error('Expected test to fail')
        }
      })
  })
})
