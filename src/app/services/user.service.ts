import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { IUser } from './../models/user';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../enums/profile';
import { IAuthenticate } from '../models/authenticate';
import { IEjtAdherent } from '../models/ejt-adherent';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public userSubject = new BehaviorSubject<IUser|null>(null);
  
  constructor(public http: HttpClient) { 
  }

  public isAdmin(): boolean{
    let isAdmin = false;

    if(this.userSubject !== null){
      isAdmin = this.userSubject.value?.profile === Profile.Admin;
    }

    return isAdmin;
  }

  public authenticate(authenticate: IAuthenticate): Observable<IUser> {
    return this.http.post<IUser>(`${this.getApiRoot()}/authenticate`,  authenticate, )
    .pipe(map(user => {
        this.userSubject.next(user);
        return user;
    }));
  } 

  public logOff():void{
    this.userSubject.next(null);
  }

  public getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.getApiRoot());
  } 

  public getAllAdherents(userId: number): Observable<IEjtAdherent[]> {
    return this.http.get<IEjtAdherent[]>(`${this.getApiRoot()}/${userId}/adherents`);
  } 

  public create(authenticate: IAuthenticate, licences: string, code: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.getApiRoot()}/licencesCodes/${licences}/code/${code}`, authenticate);
  } 

  public createLink(userId: number, licences: string, code: string): Observable<IEjtAdherent[]> {
    return this.http.post<IEjtAdherent[]>(`${this.getApiRoot()}/${userId}/licencesCodes/${licences}/code/${code}`, null);
  } 

  public update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.getApiRoot(), user);
  }  

  public updatePassword(id: number, oldpassword: string, newpassword: string): Observable<IUser> {
    return this.http.put<IUser>(`${this.getApiRoot()}/${id}/oldpassword/${oldpassword}/newpassword/${newpassword}`, null);
  } 
  
  public resetPassword(id: number, code: string, newpassword: string, token: string): Observable<IUser> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.put<IUser>(`${this.getApiRoot()}/${id}/code/${code}/newpassword/${newpassword}`, null, { headers: headers });
  } 

  public forgotPassword(username: string): Observable<any>{
    return this.http.post(`${this.getApiRoot()}/username/${username}`, null);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.getApiRoot()}/${id}`);
  }  

  private getApiRoot() : string{
    return `${ConfigService.Config?.API.apiRoot}/api/user`;
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userSubject.value?.token}`
    });
  }
}
