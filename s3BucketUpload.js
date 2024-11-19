const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
AWS.config.update({ region: 'eu-west-2' });

async function uploadToS3(fName) {
    const bucketName = 'jackspacedotsterraformmockdatapipeline19112024';
    const fileName = fName; 

    const s3 = new AWS.S3();

    const filePath = path.join(__dirname, fileName);
    const fileContent = fs.readFileSync(filePath);
  
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 
    const uniqueKey = `${timestamp}_${fileName}`;

    const params = {
        Bucket: bucketName,
        Key: uniqueKey, 
        Body: fileContent,
    };

    try {
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
    } catch (err) {
        console.error('Error uploading file:', err);
    }
}

uploadToS3(basicTestFile1.csv);
