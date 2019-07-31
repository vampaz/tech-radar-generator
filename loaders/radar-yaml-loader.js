var yaml = require('js-yaml')

function yamlLoader (source) {
  try {
    return yaml.safeLoad(source)
  } catch (err) {
    this.emitError(err)
    return null
  }
};

function toCsv (jsonData) {
  const csvData = jsonData.map(obj =>
    [obj.name, obj.ring, obj.quadrant, obj.isNew, obj.description].join(',')
  ).join('\n').trim()
  return `module.exports = \`${csvData}\``
}

module.exports = function (source) {
  const jsonData = yamlLoader(source)
  // TODO map fields, clean fields
  return toCsv(jsonData)
}
