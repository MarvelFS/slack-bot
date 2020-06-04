import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AwsService } from '../shared/aws.service';
import { FileUploadDto } from './users/dto/user.dto';

@Controller('api')
export class AppController {
  constructor(private awsService: AwsService) {}

  @Get('uploadFile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product image',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    await this.awsService.uploadFile(file);
  }
}
