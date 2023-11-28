import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAgenda } from '../models/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  apiRoot = `${ConfigService.Config.API.apiRoot}/api/agenda`;

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<IAgenda[]> {
    return this.http.get<IAgenda[]>(this.apiRoot);
  } 

  public upload(a: IAgenda): Observable<IAgenda> {
    return this.http.post<IAgenda>(this.apiRoot,  a);
  } 

  public update(n: IAgenda): Observable<IAgenda> {
    return this.http.put<IAgenda>(this.apiRoot,  n);
  } 
}
