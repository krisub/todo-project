import { Injectable } from '@angular/core';

type RequestAction = (url: string, options: RequestInit) => Promise<Response>;

@Injectable({
  providedIn: 'root'
})
export class FetchInterceptorService {
  private etagMap: Map<string, string> = new Map();

  async intercept(url: string, options: RequestInit = {}, next: RequestAction): Promise<Response> {

    if (options.method === 'PUT') {
      const etag = this.etagMap.get(url);
      if (etag) {
        options.headers = {
          ...options.headers,
          'If-Match': etag
        };
      }
    }

    console.log(options)
    const response = await next(url, options);

    if (options.method === 'GET' && url.includes('/items/')) {
      const responseEtag = response.headers.get('ETag');
      if (responseEtag) {
        this.etagMap.set(url, responseEtag);
      }
    }

    return response;
  }
}
