import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ridesService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  user
  time = {hour: 13, minute: 30};
  meridian = true;
constructor(private postServise:ridesService,private auth:AuthService,
private router:Router){

}
 
  startsAt = new FormControl('', [Validators.required]);
  phoneNum = new FormControl('', [Validators.required, Validators.minLength(10)]);
  price = new FormControl('', [Validators.required, Validators.maxLength(4)]);
  seats = new FormControl('', [Validators.required, Validators.maxLength(1)]);
  endsAt = new FormControl('', [Validators.required]);
  boarding=new FormControl('', [Validators.required]);
  on = new FormControl('', [Validators.required]);
  ngOnInit(){
   
   // this.auth.isLoggedIn().subscribe(res=>console.log(res))
   
    this.user=JSON.parse(localStorage.getItem('user'))
    //console.log(this.user)
  }

  getErrorMessage() {
    return this.startsAt.hasError('required') ? 'You must enter a Place' : ''

  }
  getErrorMessageEndsAt() {
    return this.endsAt.hasError('required') ? 'You must enter a Place' : ''

  }
  getErrorMessageBoarding() {
    return this.endsAt.hasError('required') ? 'You must enter a boarding Place' : ''

  }
  getErrorMessageSeats() {
    if (this.seats.hasError('required')) return 'You must enter a Valid Number';
    else if (this.seats.hasError('maxLength')) return 'Maximum Seats permitted 9'
    else return ''

  }
  getErrorMessagePhoneNum() {
    if (this.phoneNum.hasError('required')) return 'You must enter a Valid PhoneNumber'
    else if (this.phoneNum.hasError('minLength')) return 'Not a valid email'
    else return ''
  }
  getErrorMessagePrice() {
    if (this.price.hasError('required')) return 'You must enter a Value'
    else if (this.price.hasError('maxLength')) return 'Not a valid price'
    else return ''
  }
  getErrorMessageOn() {
    return this.on.hasError('required') ? 'You must Pick a Date' : ''

  }
  toggleMeridian() {
    this.meridian = !this.meridian;
}

  submit() {
  let uid=this.user.uid
    let rideDetails = {
      startsAt: this.startsAt.value,
      endsAt: this.endsAt.value,
      price: this.price.value,
      seats: this.seats.value,
      phone: this.phoneNum.value,
      date: this.on.value,
      boarding:this.boarding.value,
      time:`${this.time.hour} : ${this.time.minute}`,
      requsts:0,
      requestedBy:[],
      confirmed:[],
      username:this.user.displayName,
     userUid:uid
    }
   // console.log(rideDetails)
  this.postServise.addItem(rideDetails)
  this.router.navigateByUrl('/dashboard')
  }
}
