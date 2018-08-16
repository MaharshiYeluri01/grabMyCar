import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  isLoggedin: boolean
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(res => {
      if (res) {
        this.isLoggedin = true
      }
      else {
        this.isLoggedin = false
      }
      //console.log(this.isLoggedin)
    })

  }
  login() {
    this.auth.login()
  }

}
