import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUser } from '../user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private cookie: CookieService) { }

  user: IUser

  ngOnInit() {
    this.auth.getUserInfo().subscribe(res => {
      console.log("get user info", res)
      this.user = res
    })
  }

  loggout(): void{
    this.cookie.set("sid", "")
    this.cookie.set("name", "")
    this.router.navigate(['/login'])
  }
}
