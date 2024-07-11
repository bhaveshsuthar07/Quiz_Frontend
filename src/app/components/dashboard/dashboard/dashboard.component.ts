import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../../service/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private service:LoginService, private snake:MatSnackBar){}

  ngOnInit(): void {}


getUser(){

  let user:any = this.service.getUser();

  console.log(user);

}





}
