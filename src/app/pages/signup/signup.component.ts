import { Component, OnInit } from '@angular/core';
import { SignupServiceService } from '../../service/signup/signup-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

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

  SubmitForm(){

    console.log(this.user)
    if(this.user.username=='' || this.user.username==null){
      this.snake.open("Username can't be empty!!","OK",{
        duration:2000
      })
      return;
    }

    if(this.user.password=='' || this.user.password==null){
      this.snake.open("Password can't be empty!!","OK",{
        duration:2000
      })
      return;
    }

      this.service.userRegistration(this.user).subscribe(
        (response:any)=>{

          console.log(response);
          this.snake.open("User Successfully Registred","OK",{
            duration:2000
          })

        }, (error)=>{
          console.log(error);
          this.snake.open("Error Saving User!!!!","OK",{
            duration:2000
          })
        }
      )

  }

}
