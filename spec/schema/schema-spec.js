const Ajv = require('ajv')
const schema = require('../../schema.json')
const data = require('../../example-data.json')

describe('schema', function () {
  it('validates against the example data', function () {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, data)
    expect(valid).toEqual(true)
  })
})
