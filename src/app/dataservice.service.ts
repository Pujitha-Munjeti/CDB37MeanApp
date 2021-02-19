import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  
  constructor(private router:Router) { }

  update(){
    this.router.navigateByUrl("/userdashboard/updateprofile")
    console.log("Data Service")
  }
}
