import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private service:LoginService) {}

  user=null;

  ngOnInit(): void {
    this.service.loginStatusSubject.asObservable().subscribe((data)=>{
      this.user = this.service.getUser();
    })
  }



}
