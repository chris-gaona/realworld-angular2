import { Injectable } from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {JwtService} from "./jwt.service";

@Injectable()
export class ApiService {

  constructor(private http: Http,
              private jwtService: JwtService) {

  }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // setting user token on header if it exists in local storage
    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), {headers: this.setHeaders()})
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {headers: this.setHeaders(), search: params})
      .catch(this.formatErrors)
      .map((res:Response) => res.json());
  }
}
