import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../../service/signup-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import e from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public user={
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    number:"",
    password:""
  }

  ngOnInit():void{}


  constructor(private service:SignupServiceService, private snake:MatSnackBar){}


  LogInForm(){
    console.log("login function");

    if(this.user.username==''||this.user.username==null){
      this.snake.open("username can't be empty !!","ok",{
        duration:1000
      })
      return;
    }
    if(this.user.password==''||this.user.password==null){
      this.snake.open("password can't be empty !!","ok",{
        duration:1000
      })
      return;
    }

   this.service.userLogin(this.user.username).subscribe(
    response=>{
      console.log(response);
      if(response!=null){
        alert(response);

      }else{
        this.snake.open("User not found!!!!","OK",{
          duration:1000
        })
      }
    },error=>{
      console.log(error);
      this.snake.open("Error username password not match!!!!","OK",{
        duration:1000
      })
    }
   )

  }

}


