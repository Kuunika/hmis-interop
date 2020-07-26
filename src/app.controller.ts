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
  HttpService,
} from '@nestjs/common';
import { DashboardDataService } from './dashboard-data/dashboard-data.service';
import { OhspService } from './ohsp/ohsp.service';
import { Request } from 'express';

const BASE_API_URL = '/ohsp/api/v0';
@Controller()
export class AppController {
  constructor(
    private readonly ohspService: OhspService,
    private readonly http: HttpService,
  ) {}

  private getResourceFromURL(url: string): string {
    return url.split(BASE_API_URL)[1].slice(1);
  }

  private handleException(e: any) {
    const data = e.response?.data || e.message;
    const status = e.response?.status || 500;
    throw new HttpException(data, status);
  }

  @Get(`${BASE_API_URL}/dashboard/districts/aggregates`)
  async districtAggregates(): Promise<Record<string, any>> {
    try {
      const { data } = await this.http
        .get(`${process.env.COVID_DASHBOARD_API_URL}districts/aggregates`)
        .toPromise();
      return data;
    } catch (e) {
      this.handleException(e);
    }
  }

  @Get(`${BASE_API_URL}/dashboard/aggregates`)
  async aggregates(): Promise<Record<string, any>> {
    try {
      const { data } = await this.http
        .get(`${process.env.COVID_DASHBOARD_API_URL}aggregates`)
        .toPromise();
      return data;
    } catch (e) {
      this.handleException(e);
    }
  }

  @Get(`${BASE_API_URL}/*`)
  async catchAllGet(@Req() req: Request): Promise<Record<string, any>> {
    try {
      const resource = this.getResourceFromURL(req.url);
      return await this.ohspService.get(resource);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Post(`${BASE_API_URL}/*`)
  async catchAllPost(
    @Body() data: any,
    @Req() req: Request,
  ): Promise<Record<string, any>> {
    try {
      const resource = this.getResourceFromURL(req.url);
      return await this.ohspService.post(resource, data);
    } catch (e) {
      this.handleException(e);
    }
  }

  @Put(`${BASE_API_URL}/*`)
  async catchAllPut(): Promise<Record<string, any>> {
    throw new HttpException('Not Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Patch(`${BASE_API_URL}/*`)
  async catchAllPatch(): Promise<Record<string, any>> {
    throw new HttpException('Not Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
