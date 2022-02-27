import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  // region: process.env.AWS_S3_REGION,
});

@Injectable()
export class S3Service {
  async uploadFile(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(process.env.S3_URL + req.files[0].key);
      });
    } catch (error) {
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }
  async getFile(key: string, @Res() res) {
    try {
      const stream = this.getFileStream(key);
      stream.pipe(res);
    } catch (error) {
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  getFileStream(fileKey) {
    const params = {
      Key: fileKey,
      Bucket: AWS_S3_BUCKET,
    };
    return s3.getObject(params).createReadStream();
  }
  // async s3_upload(file, bucket, name, mimetype) {
  //   const params = {
  //     Bucket: bucket,
  //     Key: String(name),
  //     Body: file,
  //     ACL: 'public-read',
  //     ContentType: mimetype,
  //     ContentDisposition: 'inline',
  //     CreateBucketConfiguration: {
  //       LocationConstraint: 'ap-south-1',
  //     },
  //   };
  //   console.log(params);
  //   try {
  //     const s3Response = await s3.upload(params).promise();
  //     console.log(s3Response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET,
      // acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    }),
  }).array('upload', 1);
}
