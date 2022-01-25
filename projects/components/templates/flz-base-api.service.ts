import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { Observable } from 'rxjs';

export class FlzBaseApiService<I, M = object> {
  base!: string;
  endpoint!: string;
  token!: string;

  accessTokenKey = `fokklzdev_access_token`;
  userIdKey = `fokklzdev_user_id`;
  refreshTokenKey = `fokklzdev_refresh_token`;

  constructor(
    apiUrl: string,
    endpoint: string,
    private httpClient: HttpClient
  ) {
    this.base = apiUrl;
    this.endpoint = endpoint;
  }

  getHeaders(
    auth: boolean | string = false,
    contentType: string = 'application/json; charset=utf-8'
  ): { [header: string]: string | string[] } {
    const headers: { [header: string]: string | string[] } = {
      'Content-Type': `${contentType}`,
      Accept: 'application/json',
    };
    if (auth) {
      const token =
        typeof auth === 'string'
          ? this.token
          : localStorage[this.accessTokenKey];
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  getUrl(): string {
    return this.base + '/' + this.endpoint;
  }

  resolveUrl(route: string): string {
    if (route.length > 0 && !route.startsWith('/')) {
      route = '/' + route;
    }
    return this.getUrl() + route;
  }

  get<T = I>(route: string, auth: boolean | string = false): Observable<T> {
    if (isDevMode()) {
      console.log(`Calling '${this.resolveUrl(route)}' (auth: ${auth})`);
    }
    return this.httpClient.get<T>(this.resolveUrl(route), {
      headers: this.getHeaders(auth),
    });
  }

  post<T = I, R = M>(
    route: string,
    data: R,
    auth: boolean | string = false
  ): Observable<T> {
    if (isDevMode()) {
      console.log(`Calling '${this.resolveUrl(route)}' (auth: ${auth})`);
    }
    return this.httpClient.post<T>(this.resolveUrl(route), data, {
      headers: this.getHeaders(auth),
    });
  }

  put<T = I, R = M>(
    route: string,
    data: R,
    auth: boolean | string = false
  ): Observable<T> {
    if (isDevMode()) {
      console.log(`Calling '${this.resolveUrl(route)}' (auth: ${auth})`);
    }
    return this.httpClient.put<T>(this.resolveUrl(route), data, {
      headers: this.getHeaders(auth),
    });
  }

  patch<T = I, R = M>(
    route: string,
    data: R,
    auth: boolean | string = false
  ): Observable<T> {
    if (isDevMode()) {
      console.log(`Calling '${this.resolveUrl(route)}' (auth: ${auth})`);
    }
    return this.httpClient.patch<T>(this.resolveUrl(route), data, {
      headers: this.getHeaders(auth),
    });
  }

  delete<T = I>(route: string): Observable<T> {
    if (isDevMode()) {
      console.log(`Calling '${this.resolveUrl(route)}' (auth: true)`);
    }
    return this.httpClient.delete<T>(this.resolveUrl(route), {
      headers: this.getHeaders(true),
    });
  }
}
