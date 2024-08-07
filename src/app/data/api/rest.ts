/* USAGE:
  ** callAPI is a method wrapped over fetch.
  please refer to IRequest for the optional/required dependencies. 
  ** demo **
  const loginRESTResponse =  await callAPI({subUrl:'login', method: ERequestMethods.POST, data:{email: '', password: ''}})
*/

import * as env from '../env';
import { useAppConfig } from '../hooks/common/useAppConfig';

export enum ERequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type TRequestHeader = {
  authorization?: string;
};

type TRequestConfig = {
  multipart?: boolean;
  data?: any;
  method?: ERequestMethods;
  headers?: TRequestHeader;
};

interface IRequest {
  subUrl: string;
  config?: TRequestConfig;
}

export default function useRESTAPI() {
  const { language } = useAppConfig();

  async function callAPI({
    subUrl,
    config = { method: ERequestMethods.GET, data: {}, multipart: false, headers: {} },
  }: IRequest) {
    try {
      const { method, headers, data, multipart } = config;

      let requestOptions: any = {
        method,
      };

      let apiResponseJSON;

      requestOptions['headers'] = {
        Authorization: `Bearer ${env.API_TOKEN}`,
      };

      if (headers?.authorization) {
        requestOptions['headers'] = {
          ...requestOptions['headers'],
          Authorization: `Bearer ${headers?.authorization}`,
        };
      }

      if (multipart) {
        requestOptions.headers['Content-Type'] = 'multipart/form-data';
        const form = new FormData();
        Object.keys(data).forEach(key => form.append(key, data[key]))
        requestOptions['body'] = form;
      }

      if (!multipart && method !== ERequestMethods.GET) {
        requestOptions['headers'] = {
          ...requestOptions['headers'],
          'Content-Type': 'application/json',
        };

        requestOptions['body'] = JSON.stringify(data);
      }

      // ************* API REQUEST *************

      const apiResponse = await fetch(`${env.BASE_URL}/api/v1/${subUrl}${method === ERequestMethods.GET ? `?lang=${language}` : ``}`, requestOptions);

      apiResponseJSON = await apiResponse.json();

      if (apiResponse.status === 200) {
        // if success then,
        // 1. stop loading
        // 2. convert response to JSON
        // 3. send response back to caller
        // loader.stop();
        return apiResponseJSON;
      }

      if (apiResponse.status !== 200 && apiResponseJSON?.status === 0) throw new Error(apiResponseJSON.message);
    } catch (error: any) {
      console.log(`API ERROR: `, error.message);
      return { error };
    }
  }

  return {
    callAPI
  }
}