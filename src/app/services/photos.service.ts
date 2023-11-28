import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  
  apiRoot = `${ConfigService.Config.API.apiRoot}/api/photo`;

  constructor(public http: HttpClient) {
  }

  public getPhotosNames(folderName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiRoot}/folder/${folderName}`);
  }

  public getPhoto(folderName: string, fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiRoot}/folder/${folderName}/file/${fileName}`, {
      responseType: "blob"
    });
  } 

  public changeName(folderName: string, fileName1: string, fileName2: string):Observable<any>{
    return this.http.post(`${this.apiRoot}/folder/${folderName}/file/${fileName1}/${fileName2}`, null);
  } 

  public upload(folderName: string, formData: FormData): Observable<any>{
    return this.http.post(`${this.apiRoot}/folder/${folderName}`, formData, {reportProgress: true, observe: 'events'})
  }

  public delete(folderName: string, fileName: string): Observable<any> {
    return this.http.delete(`${this.apiRoot}/folder/${folderName}/file/${fileName}`);
  } 
}
