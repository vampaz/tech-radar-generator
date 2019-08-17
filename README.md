[![Build Status](https://travis-ci.org/dprgarner/tech-radar-generator.svg?branch=master)](https://travis-ci.org/dprgarner/tech-radar-generator)
[![npm](https://img.shields.io/npm/v/tech-radar-generator)](http://npmjs.com/package/tech-radar-generator)

# Tech Radar Generator

A library for creating a [ThoughtWorks Tech Radar][radar] as a static site. This project was forked from the [ThoughtWorks Build-Your-Own-Radar][byor] app, but modified for distribution as a reusable package.

[radar]: https://www.thoughtworks.com/radar
[byor]: https://github.com/thoughtworks/build-your-own-radar

*This library is work-in-progress! Some of the features and documentation are not finalised or fully tested yet.*

## Overview

A tech radar is an app for visualising trends within an area of software development. They reflect the opinions and decisions of the creators and curators of the radar, and by their nature are highly subjective. They are often used to reflect the decisions and future directions of a company. A more in-depth discussion of why you might want to build a Tech Radar, and the design decisions for the original ThoughtWorks tech radar, are given [here][byor-why].

[byor-why]: https://www.thoughtworks.com/insights/blog/build-your-own-technology-radar

This library is a tool for generating your own custom tech radar. The library provides a CLI script which takes in an input JSON file containing the configuration of your radar, and outputs a directory with HTML, a bundled JS app, and other static assets associated with the radar. The generated assets can then be served as a static site.

## Usage with the CLI

First, create a JSON file containing the data determining your tech radar. The JSON data should contain the title of the radar, an array of the rings you wish to use, and an array of blips on the radar. This data is validated against a [JSON schema][schema] before being processed. For example:

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
    }
  ]
}
```
[schema]: https://github.com/dprgarner/tech-radar-generator/blob/master/schema.json

Next, install this library and run the tool against the JSON data. If this tool is being incorporated into an existing JavaScript project:
```bash
> yarn add tech-radar-generator
> yarn tech-radar-generator ./my-radar.json ./dist
```

If this tool is not being incorporated into a JavaScript project, the package can be run using npx:
```bash
> npx tech-radar-generator ./my-radar.json ./dist
```

The options for the CLI tool can be seen by running `tech-radar-generator --help`:

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

## Usage within Node

This library also exports a function version of the CLI, which takes the data, destination, and options as arguments and returns a promise resolving to the output directory.

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

This tool is powered by Webpack. Some commonly-used scripts are set in the npm-scripts.

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

Releases to NPM are performed via Travis when tagged commits are pushed to the repo. Create a new tagged commit and bump the version in package.json with the npm version script:

```bash
npm version patch
```

and push the new commits and tags with:

```bash
git push && git push --tags
```

## Acknowledgements

This library is based off of the [ThoughtWorks Build-Your-Own-Radar](https://github.com/thoughtworks/build-your-own-radar) project.

## TODO

- e2e tests on the CLI and entrypoint. These keep breaking and tests would stop this
- Decide how to document Dockerfile and nginx examples. This app? A sample tech radar app? Or just leave them out?
- Should the YAML stuff live in this library?
- Add CSV input?
- Add stdin input?
