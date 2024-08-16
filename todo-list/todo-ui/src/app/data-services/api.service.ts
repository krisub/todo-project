import { Injectable, inject } from '@angular/core';
import { FetchInterceptorService } from './fetch-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = "http://localhost:3000/items";
  private fetchInterceptorService: FetchInterceptorService = inject(FetchInterceptorService);

  async fetchData(url: string, method: string = 'GET', body: any = null, headers: any = {}): Promise<any> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : null,
  };

    const requestAction = (url: string, options: RequestInit = {}) => fetch(url, options);
    console.log(options);
    const response = await this.fetchInterceptorService.intercept(`${this.apiUrl}${url}`, options, requestAction);
    const data = await response.json();
    return {
      headers: response.headers,
      body: data
    };
  }

  async get(url: string): Promise<any> {
    return this.fetchData(url, 'GET');
  }

  async post(url: string, body: any): Promise<any> {
    return this.fetchData(url, 'POST', body);
  }

  async put(url: string, body: any, headers: any = {}): Promise<any> {
    return this.fetchData(url, 'PUT', body, headers);
  }

  async delete(url: string): Promise<any> {
    return this.fetchData(url, 'DELETE');
  }
}
