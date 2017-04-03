var mime = require('mime-types')
const fs = require("fs");
const path = require("path");

exports.getContentType = (file) => {
  try {
    return mime.contentType('markdown')
  } catch (err) {
    console.log(`Failed to get content type of ${file}`)
  }
}

exports.getFiles = function getFiles(dir, results) {
  results = results || [];
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    var filepath = path.join(dir, file);
    let stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      getFiles(filepath, results);
    } else if (stats.isFile()) {
      results.push(path.join(dir, file))
    }
  });
  return results;
}
