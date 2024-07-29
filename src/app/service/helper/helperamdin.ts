import { LoginService } from "../login/login.service";

let s = false;

export class helperadmin{

  constructor(public service:LoginService){};


  login(){
    s =  this.service.isLoggedIn();
    console.log('session---------> ',s);
    return s;
  }


}

export let session = s;
