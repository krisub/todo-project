import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = "http://localhost:3000/items";

  async fetchData(url: string, method: string = 'GET', body: any = null): Promise<any> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`${this.apiUrl}${url}`, options);
    return response.json();
  }

  async get(url: string): Promise<any> {
    return this.fetchData(url, 'GET');
  }

  async post(url: string, body: any): Promise<any> {
    return this.fetchData(url, 'POST', body);
  }

  async put(url: string, body: any): Promise<any> {
    return this.fetchData(url, 'PUT', body);
  }

  async delete(url: string): Promise<any> {
    return this.fetchData(url, 'DELETE');
  }
}
