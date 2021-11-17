const S3 = require('aws-sdk/clients/s3');
const aws_data = require('./aws_data');
const fs = require('fs');


const bucketName = aws_data.aws_bucket_name;
const region = aws_data.aws_bucket_region;
const accessKeyId = aws_data.aws_bucket_key;
const secretKey = aws_data.aws_secret_key;

const s3 = new S3({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretKey
});

const uploadFile = (file) => {
    const fileStream = fs.readFileSync(file.path);
    console.log(bucketName);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    };
    const data = s3.upload(uploadParams).promise();
    return data;
};

exports.uploadFile = uploadFile