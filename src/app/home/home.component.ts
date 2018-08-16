import { Component, OnInit, OnDestroy } from '@angular/core';
import { RetriveRidesService } from '../services/retrive-rides.service';
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private retriveRides: RetriveRidesService,
    private route: ActivatedRoute) { }
  Rides: any[]
  showNothing: boolean;
  showSpinner = true;
  subscription: Subscription
  ngOnInit() {
    let query = this.route.snapshot.queryParamMap
    let startsAt = query.get('startsAt')
    let endsAt = query.get('endsAt')
    let date = query.get('date')

    this.subscription = this.retriveRides.getSearchRides(startsAt, endsAt).subscribe(res => {
      this.Rides = res;
      // console.log(res.length)

      if (res.length > 0) {
        this.showNothing = false;
      }
      else {
        this.showNothing = true;
      }
      this.showSpinner = false
    })

  }
  seAllRides() {
    //this.Rides= this.retriveRides.getRides()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }
}
