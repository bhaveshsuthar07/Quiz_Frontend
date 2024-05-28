import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  private baseUrl:String ="http://192.168.1.10:8088"

  constructor(private http:HttpClient) {}

  userRegistration(user:any){

    return this.http.post(`${this.baseUrl}/user/`,user);
    }

}
