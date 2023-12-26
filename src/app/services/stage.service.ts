import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStage } from '../models/stage';
import { IEjtAdherent } from '../models/ejt-adherent';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  
  apiRoot = `${ConfigService.Config.API.apiRoot}/api/stage`;

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<IStage[]> {
    return this.http.get<IStage[]>(this.apiRoot);
  } 

  public getAllActive(): Observable<IStage[]> {
    return this.http.get<IStage[]>(`${this.apiRoot}/active`);
  }  

  public getStagesInscription(adherentId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiRoot}/adherent/${adherentId}`);
  }  

  public getAdherentsInscription(id: number): Observable<IEjtAdherent[]> {
    return this.http.get<IEjtAdherent[]>(`${this.apiRoot}/${id}/adherents`);
  } 

  public create(s: IStage): Observable<IStage> {
    return this.http.post<IStage>(this.apiRoot,  s);
  } 

  public createStageInscription(stageId: number, adherentId: number): Observable<any>{
    return this.http.post(`${this.apiRoot}/${stageId}/adherent/${adherentId}`,  null);
  }

  public update(s: IStage): Observable<IStage> {
    return this.http.put<IStage>(this.apiRoot,  s);
  } 
}
