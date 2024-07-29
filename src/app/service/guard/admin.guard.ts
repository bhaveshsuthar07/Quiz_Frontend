import { CanActivateFn, Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../login/login.service';



export const adminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const router:Router = inject(Router);
  const login:LoginService = inject(LoginService);

  const protectedURL:string[] = ['/admin-dashboard'];
    console.log('Auth Guard');
    if(!login.isLoggedIn()){
      router.navigate(['/login']);
      return false;
    }else if(login.isLoggedIn() && login.getAuthorities()=='ADMIN'){
      return true;
    }else if(login.getUser() && login.getAuthorities()=='ADMIN'){
        return true;
    }else{
      router.navigate(['/login']);
      return false;
    }

};
