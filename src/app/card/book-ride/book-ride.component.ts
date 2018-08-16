import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetRideService } from '../../services/get-ride.service';
import { ChatService } from '../../services/chat.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})
export class BookRideComponent implements OnInit,OnDestroy {
  id
  ride: any = {}
  display: String;
  requestStatus: boolean;
  rewuestedBy: any[];
  subscription:Subscription;
  showLoader:boolean=true;
  constructor(private activatedRoute: ActivatedRoute, private getRide: GetRideService,
    private chat: ChatService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  this.subscription=  this.getRide.getoneRide(this.id).subscribe(res => {
      this.ride = res
      if (this.ride.requestedBy) {
        if (this.ride.requestedBy.indexOf(this.getuser()) >= 0) {
          //console.log(this.ride.requestedBy.indexOf(this.getuser))
          this.display = "Cancel Request"
          this.requestStatus = true;
        }
        else {
          this.display = "Request Seat";
          this.requestStatus = false
        }
      }
      else {
        this.display = "Request Seat"
        this.requestStatus = false
      }
      this.showLoader=false
    })
   
  }
  getuser() {
    let user: any = JSON.parse(localStorage.getItem('user'))
    return user.displayName
  }
  getuid() {
    let user: any = JSON.parse(localStorage.getItem('user'))
    return user.uid
  }

  addSeat() {

    this.getRide.updateRide(this.id, { seats: 12 })
  }
  requestSeat() {

    this.requestStatus = !this.requestStatus;

    (this.requestStatus) ? this.display = "Cancel Request" : this.display = "Requst Seat";
    if (this.requestStatus) {
      if (!this.ride.requestedBy) {

        this.getRide.updateRide(this.id, { requestedBy: [this.getuser()], requests: (this.ride.requests || 0) + 1 })
      }
      else {

        this.ride.requestedBy.push(this.getuser())
        this.getRide.updateRide(this.id, { requestedBy: this.ride.requestedBy, requests: (this.ride.requests || 0) + 1 })
      }
    }
    else {
      let index = this.ride.requestedBy.indexOf(this.getuser())
      this.ride.requestedBy.splice(index, 1)
      this.getRide.updateRide(this.id, { requestedBy: this.ride.requestedBy, requests: (this.ride.requests) - 1 })
    }
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe()
    
  }

}
