var yaml = require('js-yaml')

function yamlLoader (source) {
  try {
    return yaml.safeLoad(source)
  } catch (err) {
    this.emitError(err)
    return null
  }
};

module.exports = function (source) {
  const rawData = yamlLoader(source)
  // TODO map fields, clean fields
  const jsonData = rawData.map(obj => ({ ...obj, isNew: obj.isNew + '', description: obj.description.trim() }))
  return `module.exports = ${JSON.stringify(jsonData)}`
}
