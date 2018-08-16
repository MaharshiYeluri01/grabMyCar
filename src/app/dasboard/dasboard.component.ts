import { Component, OnInit } from '@angular/core';
import { RetriveRidesService } from '../services/retrive-rides.service';
import { UsersService } from '../services/users.service';
import { UserRequestsService } from '../services/user-requests.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  myrides;
  showNothing: boolean;
  showSpinner = true;
  constructor(private retriverides: RetriveRidesService, private users: UsersService,
    private requestService: UserRequestsService) { }

  ngOnInit() {
    let uid = JSON.parse(localStorage.getItem('user')).uid
    // console.log(uid)
    this.retriverides.getUserrides(uid).subscribe(res => {
      this.myrides = res;
      console.log(res.length)
      if (res.length > 0) {
        this.showNothing = false
      }
      else {
        this.showNothing = true
      }
      this.showSpinner = false
      //console.log(this.myrides)
    })


  }
  add(req, rideId, seats, requests, requestedBy, confirmed) {
    let ridingwith = JSON.parse(localStorage.getItem('user')).displayName
    let index = requestedBy.indexOf(req)
    requestedBy.splice(index, 1)
    confirmed.push(req)
    this.requestService.addItem({ requestedBy: req, requstedTo: ridingwith, rideId: rideId })
    this.users.addItem(rideId, req, { ridingwith: ridingwith, rideId: rideId, success: true }, ridingwith, seats, requestedBy, confirmed, requests)


  }
  remove(req, rideId, seats, requests, requestedBy, confirmed) {
    let ridingwith = JSON.parse(localStorage.getItem('user')).displayName
    let index = requestedBy.indexOf(req)
    requestedBy.splice(index, 1)
    seats = seats + 1
    this.requestService.addItem({ requestedBy: req, requstedTo: ridingwith, rideId: rideId })
    this.users.addItem(rideId, req, { ridingwith: ridingwith, rideId: rideId, success: false }, ridingwith, seats, requestedBy, confirmed, requests)
  }
  deleteRide(id) {
    this.retriverides.daleteRide(id)
  }

}
