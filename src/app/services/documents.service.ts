import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  apiRoot = `${ConfigService.Config.API.apiRoot}/api/document`;

  constructor(public http: HttpClient) { }

  public getDocument(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiRoot}/file/${fileName}`, {
      responseType: "blob"
    });
  } 

  public upload(formData: FormData): Observable<any>{
    return this.http.post(this.apiRoot, formData, {reportProgress: true, observe: 'events'})
  }
}
