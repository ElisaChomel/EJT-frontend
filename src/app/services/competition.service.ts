import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ICompetition } from '../models/competition';
import { Observable } from 'rxjs';
import { ICompetitionResult } from '../models/competition-result';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  apiRoot = `${ConfigService.Config.API.apiRoot}/api/competition`;

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<ICompetition[]> {
    return this.http.get<ICompetition[]>(this.apiRoot);
  } 

  public getAllActive(): Observable<ICompetition[]> {
    return this.http.get<ICompetition[]>(`${this.apiRoot}/active`);
  } 

  public getAllInscription(id: number): Observable<Blob> {
    return this.http.get(`${this.apiRoot}/${id}/export`, {
      responseType: "blob"
    });
  } 

  public getCompetitionsInscription(adherentId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiRoot}/adherent/${adherentId}`);
  } 

  public getResult(id: number): Observable<ICompetitionResult[]>{
    return this.http.get<ICompetitionResult[]>(`${this.apiRoot}/${id}/result`);
  }

  public create(c: ICompetition): Observable<ICompetition> {
    return this.http.post<ICompetition>(this.apiRoot,  c);
  } 
    
  public createResult(c: ICompetitionResult): Observable<ICompetitionResult> {
    return this.http.post<ICompetitionResult>(`${this.apiRoot}/${c.competition_id}/result`,  c);
  } 

  public update(c: ICompetition): Observable<ICompetition> {
    return this.http.put<ICompetition>(this.apiRoot,  c);
  } 

  public updateResult(c: ICompetitionResult): Observable<ICompetitionResult> {
    return this.http.put<ICompetitionResult>(`${this.apiRoot}/${c.competition_id}/result`,  c);
  } 
}
