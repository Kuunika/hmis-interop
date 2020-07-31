import {
  Controller,
  Get,
  HttpException,
  Body,
  Post,
  Req,
  Put,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { CoreApiService } from './coreservice/coreapi.service';
import { Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly coreApiService: CoreApiService) {}

  private getResourceFromURL(url: string): string {
    return url.split(process.env.API_GLOBAL_BASE_URL)[1].slice(1);
  }

  private handleException(e: any) {
    const data = e.response?.data || e.message;
    const status = e.response?.status || 500;
    throw new HttpException(data, status);
  }

  @Get(`*`)
  async catchAllGet(@Req() req: Request): Promise<Record<string, any>> {
    try {
      const resource = this.getResourceFromURL(req.url);
      return await this.coreApiService.get(resource);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Post(`*`)
  async catchAllPost(
    @Body() data: any,
    @Req() req: Request,
  ): Promise<Record<string, any>> {
    try {
      const resource = this.getResourceFromURL(req.url);
      return await this.coreApiService.post(resource, data);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Put(`*`)
  async catchAllPut(): Promise<Record<string, any>> {
    throw new HttpException('Not Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Patch(`*`)
  async catchAllPatch(): Promise<Record<string, any>> {
    throw new HttpException('Not Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
