import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  constructor(private router:Router) { }
  startsAt = new FormControl('', [Validators.required]);
  endsAt = new FormControl('', [Validators.required]);
  on = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.startsAt.hasError('required') ? 'You must enter a Place' : ''

  }
  getErrorMessageEndsAt() {
    return this.endsAt.hasError('required') ? 'You must enter a Place' : ''
  }
 getErrorMessageOn() {
    return this.on.hasError('required') ? 'You must Pick a Date' : ''

  }
  submit(){
    let query={
      startsAt: this.startsAt.value,
      endsAt:this.endsAt.value,
      date:this.on.value
      
    }
    //console.log(query)
    this.router.navigate(['/home'],{queryParams:{ startsAt: this.startsAt.value,
      endsAt:this.endsAt.value,
      date:this.on.value.toLocaleDateString()}})

  }

}
