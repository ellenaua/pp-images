const fs = require('fs');
const AWS = require('aws-sdk');
const awsConfig = require('aws-config');
const utils = require('./src/utils');
const config = require('./config');

const s3 = new AWS.S3(awsConfig({accessKeyId: '123', secretAccessKey: 'abc'}));
const BUCKET = 'my.unique.bucket.name';

let files = utils.getFiles('variations');

files.forEach(file => {
  // Read in the file, convert it to base64, store to S3
  fs.readFile(file, function (err, data) {
    if (err) { throw err; }
    var base64data = new Buffer(data, 'binary');
    s3.putObject({
      Bucket: BUCKET,
      Key: file,
      Body: base64data,
      ACL: 'public-read',
      ContentType: utils.getContentType(file)
    },function (resp) {
      console.log(`Successfully uploaded ${file}`);
    });
  });
});