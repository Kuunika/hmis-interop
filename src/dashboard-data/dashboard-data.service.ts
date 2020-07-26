import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
@Injectable()
export class DashboardDataService {
  constructor(private httpService: HttpService) {}

  get ohspConfiguration(): any {
    const { OHSP_BASE_URL, OHSP_USERNAME, OHSP_PASSWORD } = process.env;
    return {
      url: OHSP_BASE_URL,
      username: OHSP_USERNAME,
      password: OHSP_PASSWORD,
    };
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

  async aggregates() {
    try {
      console.log(`${process.env.COVID_DASHBOARD_API_URL}aggregates`);
      const { data } = await this.getData(
        `${process.env.COVID_DASHBOARD_API_URL}aggregates`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  async districtAggregates() {
    try {
      const { data } = await this.getData(
        `${process.env.COVID_DASHBOARD_API_URL}districts/aggregates`,
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
}
