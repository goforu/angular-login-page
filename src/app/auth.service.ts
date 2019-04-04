import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { IRes } from './res'
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: any){
    console.log("login")
    return this.http.post<IRes>('/api/login', user)
  }

  getUserInfo(){
    console.log("get user info")
    return this.http.get<IUser>('/api/user')
  }

  logout(): void{
    console.log("logout")
    localStorage.removeItem("token");
  }

  handleErr(){
    console.log("error")
  }
}
