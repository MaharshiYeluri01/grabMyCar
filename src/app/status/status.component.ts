import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatusService } from '../services/status.service';
import { UserRequestsService } from '../services/user-requests.service';
import { GetRideService } from '../services/get-ride.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
  myRequests;
  oneRequest: any[];
  myRide: any;
  showNothing: boolean;
  showSpinner = true;
  showSpinner2: boolean
  subsription: Subscription
  constructor(private statusService: StatusService,
    private userRequestservice: UserRequestsService,
    private getRide: GetRideService) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')).displayName
    this.subsription = this.userRequestservice.getUserRequests(user).subscribe(res => {
      this.myRequests = res

     // console.log(res.length)
      if (res.length > 0) {
        this.showNothing = false;
      }
      else {
        this.showNothing = true;
      }
      this.showSpinner = false
    })
    //this.statusService.getRideStatus(user).subscribe(res=>console.log(res))
  }
  getStatus(requestesTo) {
    this.showSpinner2 = true;
    let user = JSON.parse(localStorage.getItem('user')).displayName
    this.statusService.getRideStatus(user, requestesTo).subscribe(
      res => {
        this.oneRequest = res
        //console.log(res)
        this.showSpinner2 = false;
      }
    )
  }
  getThisRide(id) {
   // console.log(id)
    this.getRide.getoneRide(id).subscribe(res => this.myRide = res)

  }
  message(accept) {
    if (accept) { return "Your trip is ON" }
    else return "Sorry OWner Was Not Intrested"
  }
  ngOnDestroy(): void {
    this.subsription.unsubscribe()

  }
}
