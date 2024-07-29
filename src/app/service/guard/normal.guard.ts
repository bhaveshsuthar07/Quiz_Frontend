import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';
import { log } from 'console';

export const normalGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const router:Router = inject(Router);
  const login:LoginService = inject(LoginService);

  const protectedURL:string[] = ['/dashboard'];
    console.log('Normal Auth Guard');
if(!login.isLoggedIn()){
  router.navigate(['/login']);
  return false;
}else if(login.isLoggedIn() && login.getAuthorities()=='NORMAL'){
  return true;
}else if(login.getUser() && login.getAuthorities()=='ADMIN'){
  return true;
}else{
  router.navigate(['/login']);
      return false;
}


    //return protectedURL.includes(state.url) && !login.isLoggedIn() ? router.navigate(['/login']): true;
};
