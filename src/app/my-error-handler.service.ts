import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyErrorHandler implements ErrorHandler {

  handleError(error) {
   
    alert('Opps Something Went Wrong !')
    console.log(error)
  }
}
