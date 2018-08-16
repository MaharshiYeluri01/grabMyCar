import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private auth:AuthService,private router:Router){}
canActivate(){
 return  this.auth.isLoggedIn().pipe(
    map(user=>{
      if(user){return true}

      else {this.router.navigateByUrl("/info")
    return false}
    })
  )
}
}
