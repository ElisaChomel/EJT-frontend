import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INew } from '../models/new';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiRoot = `${ConfigService.Config.API.apiRoot}/api/new`;

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<INew[]> {
    return this.http.get<INew[]>(this.apiRoot);
  } 

  public upload(n: INew): Observable<INew> {
    return this.http.post<INew>(this.apiRoot,  n);
  } 

  public update(n: INew): Observable<INew> {
    return this.http.put<INew>(this.apiRoot,  n);
  } 
}
