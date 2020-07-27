import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';

interface APIConfig {
  url: string;
  username: string;
  password: string;
}

@Injectable()
export class CoreApiService {
  constructor(private httpService: HttpService) {}

  get apiConfiguration(): APIConfig {
    const { API_BASE_URL, API_USERNAME, API_PASSWORD } = process.env;
    return {
      url: API_BASE_URL,
      username: API_USERNAME,
      password: API_PASSWORD,
    };
  }

  private async postData(
    _resource: string,
    _data: any,
  ): Promise<AxiosResponse> {
    const { url, username, password } = this.apiConfiguration;
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
    const { url, username, password } = this.apiConfiguration;
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
