import { Component } from '@angular/core';
import { LoginService } from '../../../service/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private service:LoginService){}


  logout(){
    this.service.logout();
  }

}
