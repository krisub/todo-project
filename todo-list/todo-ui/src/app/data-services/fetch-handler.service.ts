import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchHandlerService {
  async handle(url: string, options: RequestInit = {}): Promise<Response> {
    return await fetch(url, options);
  }
}
