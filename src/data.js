/**
 * This file is transpiled using val-loader, which interpolates in the static
 * data provided by the consumer of this library.
 */

module.exports = ({ data }) => ({ code: `
const { title, rings, blips, quadrants } = ${JSON.stringify(data)}

blips.forEach(blip => { blip.isNew = blip.isNew + '' })

module.exports = { title, rings, blips, quadrants }
` })
