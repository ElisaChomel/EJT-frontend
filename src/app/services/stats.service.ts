import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { IStat } from '../models/stat';
import { Observable } from 'rxjs';
import { IStatPieValues } from '../models/stat-pieValues';
import { IStatBarValues } from '../models/stat-barValues';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  apiRoot = `${ConfigService.Config.API.apiRoot}/api/stats`;

  constructor(public http: HttpClient) {
  }

  public add(pageName: string): Observable<IStat> {
    return this.http.post<IStat>(`${this.apiRoot}/pageName/${pageName}`,  null);
  } 

  public getPieValues(): Observable<IStatPieValues> {
    return this.http.get<IStatPieValues>(`${this.apiRoot}/pieValues`);
  }

  public getBarValues(): Observable<IStatBarValues> {
    return this.http.get<IStatBarValues>(`${this.apiRoot}/barValues`);
  }
}
