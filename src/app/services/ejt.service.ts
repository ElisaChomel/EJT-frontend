import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { IEjtPerson } from '../models/ejt-person';
import { Observable } from 'rxjs';
import { IEjtAdherent } from '../models/ejt-adherent';

@Injectable({
  providedIn: 'root'
})
export class EjtService {

  apiRoot = `${ConfigService.Config.API.apiRoot}/api/ejt`;

  constructor(public http: HttpClient) {
  }

  public getAllPerson(): Observable<IEjtPerson[]> {
    return this.http.get<IEjtPerson[]>(`${this.apiRoot}/person`);
  } 

  public createPerson(p: IEjtPerson): Observable<IEjtPerson> {
    return this.http.post<IEjtPerson>(`${this.apiRoot}/person`,  p);
  } 

  public updatePerson(p: IEjtPerson): Observable<IEjtPerson> {
    return this.http.put<IEjtPerson>(`${this.apiRoot}/person`,  p);
  } 

  public getAllAdherent(): Observable<IEjtAdherent[]> {
    return this.http.get<IEjtAdherent[]>(`${this.apiRoot}/adherent`);
  } 

  public createAdherent(p: IEjtAdherent): Observable<IEjtAdherent> {
    return this.http.post<IEjtAdherent>(`${this.apiRoot}/adherent`,  p);
  } 

  public updateAdherent(p: IEjtAdherent): Observable<IEjtAdherent> {
    return this.http.put<IEjtAdherent>(`${this.apiRoot}/adherent`,  p);
  } 
}
