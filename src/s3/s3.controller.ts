import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { S3Service } from './s3.service';
import { Controller, Post, Req, Res, Get, Param } from '@nestjs/common';

@ApiTags('s3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        upload: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/images')
  async upFile(@Req() request, @Res() response) {
    return this.s3Service.uploadFile(request, response);
  }

  @Get('/images/:key')
  async getFile(@Param('key') key: string, @Res() response) {
    return this.s3Service.getFile(key, response);
  }
}
