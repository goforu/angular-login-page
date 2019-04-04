import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: FormGroup

  error: string

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get name(){
    return this.form.get("username");
  }

  get password(){
    return this.form.get("password");
  }

  submit() {
    console.log("login submit");
    this.error = "";
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe(res  => {
        console.log("login", res);
        if(res.code === 1){
          this.router.navigate(['/home'])
        }else{
          this.error = res.msg;
        }
      })
      return;
    }
  }
}
