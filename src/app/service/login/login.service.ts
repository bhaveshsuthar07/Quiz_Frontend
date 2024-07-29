import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

private baseUrl:String ="http://192.168.1.10:8088"

  constructor(private http:HttpClient) { }


  public loginStatusSubject = new Subject<boolean>();

  genrateToken(logindata:any){
    return this.http.post(`${this.baseUrl}/token`,logindata);
  }

  loginUser(username:any,accessToken:any){
    // return this.http.get(`${this.baseUrl}/user/get/${username}`,{
    //   headers:{
    //     'Authorization':`Bearer ${accessToken}`
    //   }
    // });
    return this.http.get(`${this.baseUrl}/current`,{
         headers:{
           'Authorization':`Bearer ${accessToken}`
         }
       });
    }



  // custom methods
  // for userLogin validation

  public login(token:any){
    //this.logout();
    localStorage.setItem('token',token);
    localStorage.setItem('firstName','');
    return true;
  }

  public isLoggedIn(){

    let token = localStorage.getItem('token');

    if(token==undefined||token=='' || token==null){
      return false;
    }else{
      return true;
    }

  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }


  public setUser(user:any){
    let userString = JSON.stringify(user);
    localStorage.setItem('user',userString);
    localStorage.setItem('firstName',user.firstName);
  }

  public getUser(){
    let userstring = localStorage.getItem('user');

    if(userstring!=null){
      let user:any = JSON.parse(userstring);
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

  public getFirstName(){
    return localStorage.getItem('firstName');
  }
}
