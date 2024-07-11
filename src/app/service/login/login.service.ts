import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

private baseUrl:String ="http://192.168.1.10:8088"

  constructor(private http:HttpClient) { }

  genrateToken(logindata:any){
    return this.http.post(`${this.baseUrl}/token`,logindata);
  }

  loginUser(username:any,accessToken:any){
    return this.http.get(`${this.baseUrl}/user/get/${username}`,{
      headers:{
        'Authorization':`Bearer ${accessToken}`
      }
    });
  }



  // custom methods
  // for userLogin validation

  public login(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){

    let token = localStorage.getItem('token');

    if(token==null||token==''||token==undefined){
      return false;
    }else{
      return true;
    }

  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }


  public setUser(user:any){
    let userString = JSON.stringify(user);
    localStorage.setItem('user',userString);
  }

  public getUser(){
    let userstring = localStorage.getItem('user');

    console.log(userstring,'+++++++++++++++++++++++')

    if(userstring!=null || userstring != undefined){
      let user:any = JSON.parse(userstring);

      console.log(user,'+++++++++++++++++++++++')

      return user;
    }else{
      this.logout();
      return null;
    }

  }

  public getAuthorities(){
     let userString  = localStorage.getItem('user');
     if(userString!=null || userString != undefined){
      let user:any = JSON.parse(userString);
      return user.authorities[0].authority;
     }
  }
}
