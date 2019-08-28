const childProcess = require('child_process')

const tmp = require('tmp')

describe('CLI end-to-end', () => {
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
    const stdout = childProcess.execFileSync('./bin/tech-radar-generator', [
      './example-data.json',
      tmpDir.name,
      '-d'
    ], { encoding: 'utf8' })
    expect(stdout).toContain('error.html')
    expect(stdout).toContain('index.html')
    expect(stdout).toContain('images')
    expect(stdout).toMatch(/common\.[0-9a-f]+\.css/)
    expect(stdout).toMatch(/common\.[0-9a-f]+\.js/)
    expect(stdout).toMatch(/main\.[0-9a-f]+\.css/)
    expect(stdout).toMatch(/main\.[0-9a-f]+\.js/)
  })

  it('fails when the input file is missing', () => {
    let failed = false
    try {
      childProcess.execFileSync('./bin/tech-radar-generator', [
        './does-not-exist.json',
        tmpDir.name,
        '-d'
      ], { encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] })
    } catch (e) {
      failed = true
      expect(e.message).toContain('ENOENT')
    }
    expect(failed).toBe(true)
  })
})
