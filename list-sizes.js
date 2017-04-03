const utils = require('./src/utils');

let files = utils.getFiles('variations');

files.forEach(file => {

  let sizeOf = require('image-size');

  try {
    let dimensions = sizeOf(file);
    let params = {
      url: file,
      width: dimensions.width,
      height: dimensions.height
    };
    console.log(`%j`, params);
  } catch (err) {
    console.log(`Failed to get size of ${file}: ${err.message}`)
  }
});