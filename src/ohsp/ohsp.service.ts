import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

interface OHSPConfig {
  url: string;
  username: string;
  password: string;
}

@Injectable()
export class OhspService {
  constructor(private httpService: HttpService) {}

  get ohspConfiguration(): OHSPConfig {
    const { OHSP_BASE_URL, OHSP_USERNAME, OHSP_PASSWORD } = process.env;
    return {
      url: OHSP_BASE_URL,
      username: OHSP_USERNAME,
      password: OHSP_PASSWORD,
    };
  }

  private async postData(
    _resource: string,
    _data: any,
  ): Promise<AxiosResponse> {
    const { url, username, password } = this.ohspConfiguration;
    const response = await this.httpService
      .post(`${url}${_resource}`, _data, {
        auth: {
          username,
          password,
        },
      })
      .toPromise();
    return response;
  }

  private async getData(_resource: string): Promise<AxiosResponse> {
    const { url, username, password } = this.ohspConfiguration;
    const response = await this.httpService
      .get(`${url}${_resource}`, {
        auth: {
          username,
          password,
        },
      })
      .toPromise();
    return response;
  }

  async get(resource: string): Promise<AxiosResponse> {
    try {
      const { data } = await this.getData(resource);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async post(
    resource: string,
    _data: Record<string, any>,
  ): Promise<AxiosResponse> {
    try {
      const { data } = await this.postData(resource, _data);
      return data;
    } catch (e) {
      throw e;
    }
  }
}
