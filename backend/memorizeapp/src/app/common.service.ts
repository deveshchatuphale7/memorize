import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseURL = 'http://localhost:5000'
  constructor(private http : HttpClient,
    // private notification: NzNotificationService
    ) {
  }
    httpPost(url:string,params?:any){
      return this.http.post(this.baseURL + url,params);
    }
    
    httpGet(url:string){
      return this.http.get(this.baseURL + url);
    }
    
    // createNotification(type: string,title:string,message:string): void {
    //   this.notification.create(
    //     type,
    //     title,
    //     message);
    // }


   
}
