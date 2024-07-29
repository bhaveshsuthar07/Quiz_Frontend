import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../service/login/login.service';
import { Route, Router } from '@angular/router';


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

  public tc={
    termsandcondition:''
  }

  public accessToken={
    token:''
  }


  ngOnInit():void{}


  constructor(private service:LoginService, private snake:MatSnackBar,private route:Router){}


  LogInForm(){
    console.log("login function");
    localStorage.setItem('test','test');
// validating login form data
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

    // if(this.tc.termsandcondition==null||this.tc.termsandcondition==''){
    //   this.snake.open("Please accept Terms & Condition !!","OK",{
    //     duration:1000
    //   })
    //   return;
    // }


// Calling token function
    this.token(this.loginData);

    //setTimeout(this.loginUser,1000)
  }

  // Genrate Token for access the API
  token(loginData:any){
    console.log("genrate access token");

    console.log(loginData);

    this.service.genrateToken(loginData).subscribe(
      (response:any)=>{
        console.log('Access Token=====>',response.token);

        this.accessToken = response.token;
        this.service.login(response.token);

        //if token has genrated then calling login user fucntion
        this.loginUser(this.loginData.username,this.accessToken);

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

   loginUser(username:any,accessToken:any){
    this.service.loginUser(username,accessToken).subscribe(
      (user:any)=>{
        console.log(user);
        if(user!=null){
          //alert(user.username);
          this.service.setUser(user);
          let authority = this.service.getAuthorities();
          if(authority=='NORMAL'){
          this.route.navigate(['dashboard']);
          this.service.loginStatusSubject.next(true);
          }else if(authority=='ADMIN'){
            this.route.navigate(['admin-dashboard']);
            this.service.loginStatusSubject.next(true);
          }


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


