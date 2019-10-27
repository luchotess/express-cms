import awsSDK from 'aws-sdk';
import fs from 'fs';

export function uploadFile(filename, fileDirectoryPath) {
    awsSDK.config.update({ accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY });
    const s3 = new awsSDK.S3();

    return new Promise(function (resolve, reject) {
        fs.readFile(fileDirectoryPath.toString(), function (err, data) {
            if (err) { reject(err); }
            s3.putObject({
                Bucket: 'cusco-360',
                Key: filename,
                Body: data,
                ACL: 'public-read'
            }, function (err, data) {
                if (err) reject(err);
                resolve("succesfully uploaded");
            });
        });
    });
}
