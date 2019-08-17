#!/usr/bin/env node
const tree = require('tree-node-cli')
// const argv = require('yargs').argv

const mode = 'production'
// const mode = 'development'

require('../main')({ mode })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .then(dist => {
    console.log(tree(dist))
  })
