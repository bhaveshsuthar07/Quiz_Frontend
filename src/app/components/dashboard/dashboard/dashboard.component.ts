import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../../service/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public loginUser={
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    number:"",
    password:""
  }


  constructor(private service:LoginService, private snake:MatSnackBar){}

  ngOnInit(): void {}


getUser(){

  let user:any = this.service.getUser();

  console.log(user);
  this.loginUser = user;

}

  //  logout(){
  //   console.log("logout function running...............");
  //     this.service.logout();
  // }



}
