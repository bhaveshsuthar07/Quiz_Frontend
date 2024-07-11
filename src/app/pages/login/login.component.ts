import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginData={
    username:'',
    password:''
  }

  public accessToken={
    token:''
  }


  ngOnInit():void{}


  constructor(private service:LoginService, private snake:MatSnackBar){}


  LogInForm(){
    console.log("login function");

    if(this.loginData.username==''||this.loginData.username==null){
      this.snake.open("username can't be empty !!","ok",{
        duration:1000
      })
      return;
    }
    if(this.loginData.password==''||this.loginData.password==null){
      this.snake.open("password can't be empty !!","ok",{
        duration:1000
      })
      return;
    }

    this.token(this.loginData);

    //setTimeout(this.loginUser,1000)


  }

  token(loginData:any){
    console.log("genrate access token");

    console.log(loginData);

    this.service.genrateToken(loginData).subscribe(
      (response:any)=>{
        console.log('Access Token=====>',response.token);

        this.accessToken = response.token;
        this.service.login(response.token);
        this.loginUser();

      }, (error:any)=>{
        console.log('Error =====>',error);
        this.snake.open("Something went wroing !!","ok",{
          duration:1000
        })
      }

    )
  }


  // set token in aurthorization header

  // {
  //   headers: {'Authorization': `Bearer ${accessToken}`}
  // }

   loginUser(){
    this.service.loginUser(this.loginData.username,this.accessToken).subscribe(
      (response:any)=>{
        console.log(response);
        if(response!=null){
          alert(response.username);
          this.service.setUser(response);
          window.location.replace("http://localhost:4200/dashboard");

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


