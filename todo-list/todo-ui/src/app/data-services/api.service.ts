import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = "http://localhost:3000/items";

  async fetchData(url: string, method: string = 'GET', body: any = null, customHeaders: any = {}): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`${this.apiUrl}${url}`, options);

    const responseBody = await response.json();
    const responseHeaders = this.parseHeaders(response.headers);

    return { body: responseBody, headers: responseHeaders };
  }

  async get(url: string): Promise<any> {
    return this.fetchData(url, 'GET');
  }

  async post(url: string, body: any): Promise<any> {
    return this.fetchData(url, 'POST', body);
  }

  async put(url: string, body: any, customHeaders: any = {}): Promise<any> {
    return this.fetchData(url, 'PUT', body, customHeaders);
  }

  async delete(url: string): Promise<any> {
    return this.fetchData(url, 'DELETE');
  }

  private parseHeaders(headers: Headers): any {
    const headerObj: any = {};
    headers.forEach((value, key) => {
      headerObj[key] = value;
    });
    return headerObj;
  }
}
