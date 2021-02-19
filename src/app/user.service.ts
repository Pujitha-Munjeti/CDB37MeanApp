import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //inject HttpClient obj
  constructor(private hc:HttpClient) { }

  //user registration
  createUser(userObj:any):Observable<any>{
    return this.hc.post("/user/register",userObj)
  }

  loginUser(userCredObj:any):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }

  getUser(username:any):Observable<any>{
    return this.hc.get("/user/getuser/"+username);
  }

  updateUser(userObj:any):Observable<any>{
    return this.hc.put("/user/updateuser/"+userObj.username,userObj);
  }
}
