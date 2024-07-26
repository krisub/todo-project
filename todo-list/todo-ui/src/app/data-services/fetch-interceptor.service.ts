import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchInterceptorService {
  private etagMap: Map<string, string> = new Map();

  async intercept(url: string, options: RequestInit = {}): Promise<Response> {

    if (options.method === 'PUT') {
      const etag = this.etagMap.get(url);
      if (etag) {
        options.headers = {
          ...options.headers,
          'If-Match': etag
        };
      }
    }

    const response = await fetch(url, options);

    if (options.method === 'GET') {
      const responseEtag = response.headers.get('ETag');
      if (responseEtag) {
        this.etagMap.set(url, responseEtag);
      }
    }

    return response;
  }
}
