import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofileupdate',
  templateUrl: './userprofileupdate.component.html',
  styleUrls: ['./userprofileupdate.component.css']
})
export class UserprofileupdateComponent implements OnInit {

  userObj:any; 
  
  constructor(private us:UserService,private router:Router ) { } 
  ngOnInit(): void { 
    //get username from local storage 
    let username=localStorage.getItem("username")
    this.userObj=this.us.getUser(username).subscribe( 
      res=>{ 
        if(res["message"]=="success"){
        this.userObj=res["user"]
        }
        else{
          alert(res["message"])
          //navigate to login page
          this.router.navigateByUrl("/login")
        }
      }, 
      err=>{ 
        alert("Something went wrong") 
        console.log(err) 
      } )  
    } 
    
  }