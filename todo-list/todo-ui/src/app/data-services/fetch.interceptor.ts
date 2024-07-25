import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchInterceptorService {
  private etagMap: Map<string, string> = new Map();

  async intercept(url: string, options: RequestInit = {}): Promise<Response> {

    const etag = this.etagMap.get(url);
    if (etag && options.method === 'PUT') {
      options.headers = {
        ...options.headers,
        'If-Match': etag
      };
    }

    const response = await fetch(url, options);

    const responseEtag = response.headers.get('ETag');
    if (responseEtag) {
      this.etagMap.set(url, responseEtag);
    }

    return response;
  }
}
