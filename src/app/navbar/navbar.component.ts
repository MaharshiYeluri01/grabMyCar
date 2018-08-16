import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }
user:any;
  ngOnInit() {
   this.authService.currentUser().subscribe(res=>{
     this.user=res
    // console.log(this.user)
    })
   
  }
  login(){
    this.authService.login()
  }
 logout(){
   this.router.navigateByUrl("/info")
   this.authService.logout()
 }
}
