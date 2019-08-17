[![Build Status](https://travis-ci.org/dprgarner/tech-radar-generator.svg?branch=master)](https://travis-ci.org/dprgarner/tech-radar-generator)
[![npm](https://img.shields.io/npm/v/tech-radar-generator)](http://npmjs.com/package/tech-radar-generator)

# Tech Radar Generator

A library that generates a static site version of the [ThoughtWorks Tech Radar][radar] from a JSON configuration object. This library is a fork of the [ThoughtWorks Build-Your-Own-Radar][byor] app.

[radar]: https://www.thoughtworks.com/radar
[byor]: https://github.com/thoughtworks/build-your-own-radar

## Overview

A tech radar is an app for visualising trends within an area of software development. They reflect the opinions and decisions of the creators and curators of the radar, and by their nature are highly subjective. They are often used to reflect the decisions and future directions of a company. A more in-depth discussion of why you might want to build a Tech Radar, and the design decisions for the original ThoughtWorks tech radar, are given [here][byor-why].

[byor-why]: https://www.thoughtworks.com/insights/blog/build-your-own-technology-radar

This library is a tool for generating a static website version of your own custom tech radar. The library provides a CLI script which takes in an input JSON file containing the configuration of your radar, and outputs a directory with HTML, a bundled JS app, and other static assets associated with the radar. This generated code can then be served as static files by any means, such as with an Nginx Docker image.

## Usage with the CLI

First, create a JSON file containing the data determining your tech radar. The JSON data should contain the title of the radar, an array of the rings you wish to use, and an array of blips on the radar. This JSON is validated against a [JSON schema][schema] before being processed. For example:

```json
{
  "title": "My Radar",
  "rings": ["adopt", "trial", "assess", "hold"],
  "blips": [
    {
      "name": "JSF",
      "quadrant": "Languages & Frameworks",
      "ring": "hold",
      "isNew": false,
      "description": "We continue to see teams run into trouble using JSF ..."
    },
    /* ... */
  ]
}
```
[schema]: https://github.com/dprgarner/tech-radar-generator/blob/master/schema.json

Next, install this library and run the tool against the JSON data. If this is being incorporated into an existing JavaScript project:
```bash
> yarn global add tech-radar-generator
> yarn tech-radar-generator ./my-radar.json ./dist
```

For global use:
```bash
> yarn global add tech-radar-generator
> tech-radar-generator ./my-radar.json ./dist
```
or alternatively, using npx:
```bash
> npx tech-radar-generator ./my-radar.json ./dist
```

The full options for the CLI tool can be seen by running `tech-radar-generator --help`:

```bash
> tech-radar-generator --help
radar <input> <output>

Builds a tech radar

Positionals:
  input   the path to a valid JSON config input                         [string]
  output  the path to output the generated dist                         [string]

Options:
  --version  Show version number                                       [boolean]
  --dev, -d  build in development mode                                 [boolean]
  --help     Show help                                                 [boolean]
```

## Usage with the library programatically via Node

This library also exports a function which takes the data, destination, and options as arguments and returns a promise resolving to the output directory.
```js
const techRadarGenerator = require('tech-radar-generator')
const data = require('./my-radar.json')

techRadarGenerator(data, './dist', { mode: 'development' })
  .then(dist => {
    console.log(`Successfully compiled to ${dist}`)
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
```

Unlike the CLI, this function takes the source data as a JavaScript object, and _not_ as a file path. The input and output arguments are required. The third argument is an optional "options" object, and takes the following properties:

- `mode`: `'development'` or `'production'` - The Webpack development mode. When set to `"production"`, the code is minified, but takes longer to process. Defaults to `"production"`.


## Developing

This tool is powered by Webpack. Some commonly-used scripts are given in the npm-scripts.

To run the webpack-dev-server:

     yarn dev

To run the tests:

     yarn test

To run the linter:

     yarn lint

To format the code using [standard][standard]:

     yarn format

[standard]: https://standardjs.com/

## Releasing

Releases to NPM are performed via Travis when tagged commits are pushed to the
repo. Create a new tagged commit and bump the version in package.json with:

```bash
npm version patch
```

and push the new commits and tags with:

```bash
git push && git push --tags
```

## Acknowledgements

This library is based off of the [ThoughtWorks Build-Your-Own-Radar](https://github.com/thoughtworks/build-your-own-radar) project.

## Notes

- Better rings idea: https://medium.com/ingeniouslysimple/building-our-own-tech-radar-1e577e48659c
