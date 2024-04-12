import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClothe } from '../models/clothes';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  apiRoot = `${ConfigService.Config.API.apiRoot}/api/clothe`;

  constructor(public http: HttpClient) {
  }

  public getDate(): Observable<Date> {
    return this.http.get<Date>(`${this.apiRoot}/date`);
  } 

  public setDate(date: Date): Observable<Date> {
    return this.http.put<Date>(`${this.apiRoot}/date/${date}`, null);
  }  

  public setConfirmOrderReceived(): Observable<any>{
    return this.http.post<Date>(`${this.apiRoot}/order/confirm`, null);
  }

  public get(ref: string): Observable<IClothe> {
    return this.http.get<IClothe>(`${this.apiRoot}/ref/${ref}`);
  } 

  public getFile(ref: string): Observable<Blob> {
    return this.http.get(`${this.apiRoot}/ref/${ref}/file`, {
      responseType: "blob"
    });
  } 

  public getAll(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiRoot}/all`);
  } 

  public insertOrder(o: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.apiRoot, o);
  }

  public updateOrderIsPay(id: number): Observable<any> {
    return this.http.put(`${this.apiRoot}/id/${id}/isPay`, null);
  } 

  public getOrderExcel(): Observable<Blob> {
    return this.http.get(`${this.apiRoot}/export`, {
      responseType: "blob"
    });
  } 
}
