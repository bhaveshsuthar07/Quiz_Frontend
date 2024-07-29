import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  ngOnInit(): void {}

  constructor(public service:LoginService) { }


  isLogin(){
    if(this.service.isLoggedIn()){
      return true;
    }else{
      return false;
    }
  }


  getUser(){
    if(this.isLogin()){
      let firstName = this.service.getFirstName();
      console.log('AT NAV BAR',firstName);
      return firstName;
    }else{
      return null;
    }

  }

}



