import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetRideService } from '../services/get-ride.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-viewride',
  templateUrl: './viewride.component.html',
  styleUrls: ['./viewride.component.css']
})
export class ViewrideComponent implements OnInit,OnDestroy {
  myRide={}
  notFound:boolean
  showSpinner=true;
  subsription:Subscription
  showNothing:boolean
  constructor(private route:ActivatedRoute, private getRide:GetRideService) { }

  ngOnInit() {
   let id= this.route.snapshot.paramMap.get('id')
   this.subsription=this.getRide.getoneRide(id).subscribe(res=>{
     this.myRide=res
     this.showSpinner=false;
    
    if(res==undefined) {
      this.showNothing=true
      //console.log(res)
    }
    },error=>{
    this.notFound=true
    this.showSpinner=false;
   })
  }
  ngOnDestroy(): void {
   this.subsription.unsubscribe()
    
  }

}
