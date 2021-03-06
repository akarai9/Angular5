import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './../../login/login.component';
import { SignupComponent } from './../../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( public router:Router ) { }

  ngOnInit() {
  }
  
  gotoLogin = () => this.router.navigateByUrl('/home/login');
  gotoSignUp = () => this.router.navigateByUrl('/home/signup');
}
