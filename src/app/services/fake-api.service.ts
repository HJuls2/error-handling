import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  private successUrl = 'https://success2.free.beeceptor.com';
  private badRequestUrl = 'https://badrequestendpoint.free.beeceptor.com';
  private forbiddenUrl = 'https://forbiddenendpoint.free.beeceptor.com';
  private notFoundUrl = 'https://notfoundendpoint.free.beeceptor.com';
  private unathorizedUrl = 'https://unathorizedendpoint.free.beeceptor.com';
  private internalServerErrorUrl = 'https://internalservererrorendpoint.free.beeceptor.com';

  constructor(private http: HttpClient) { }

  public successMethod(): Observable<string>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<string> (this.successUrl, {headers: headers});
  }


  public badRequestMethod(): Observable<string>{
    return this.http.get<string> (this.badRequestUrl);
  }

  public forbiddenMethod(): Observable<string>{
    return this.http.get<string> (this.forbiddenUrl);
  }

  public notFoundMethod(): Observable<string>{
    return this.http.get<string>(this.notFoundUrl);
  }

  public unathorizedMethod(): Observable<string>{
    return this.http.get<string>(this.unathorizedUrl);
  }

  public internalServerErrorMethod(): Observable<string>{
    return this.http.get<string>(this.internalServerErrorUrl);
  }
}
