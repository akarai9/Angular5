import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { GlobalService } from './../GlobalService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;	
  forgotPasswordForm : FormGroup;   
  showLoader:boolean = false;
  display:boolean = false;

  constructor(public fb:FormBuilder, public globalService: GlobalService, public router:Router ) { }

  ngOnInit() {
  	this.formInitialization();
  }
  
  formInitialization = () =>{
  	this.loginForm = new FormGroup({
  		'email':new FormControl('',Validators.required),
  		'password':new FormControl('',Validators.required)
  	},{ updateOn: 'blur' });
    this.forgotPasswordForm = this.fb.group({
      email:['',{ updateOn:'blur', validators:[Validators.required]}],
    })
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  
  login() {
    if (this.globalService.isFormValid(this.loginForm)) {
      this.loginForm.value.password = window.btoa(this.loginForm.value.password); // for encrypt/decrypt password
      this.showLoader=true;
      const url = this.globalService.basePath + 'admin/login'
      this.globalService.PostRequest(url , this.loginForm.value)
      .subscribe(res => {
        this.showLoader = false;
        this.loginForm.reset();
        /*Save Logged in user Data in the Localstorage for later use*/
        if(res[0].json.object){
          localStorage.setItem('userInfo', JSON.stringify(res[0].json.object));
        }
        if(res[0].json.json().status_code == 200)
        { 
          this.globalService.showViaService('success','','Login Successfully');
          this.router.navigateByUrl('/home');
        }
        else{
          this.globalService.showViaService('error','Error',res[0].json.json().error.object)
        }
        // this.globalService.loggedInVar = true;
        // this.globalService.loggedInObs.next(this.globalService.loggedInVar);

      },err =>{
        this.showLoader=false;
        this.formInitialization();
        // this.globalService.showLoginAlert("Network Failure!."); 
      })
    }
  } 

  forgotPasswordOfUser(){

    const url = this.globalService.basePath + 'admin/forget/password';
    if(this.globalService.isFormValid(this.forgotPasswordForm)){ 
      this.showLoader = true;
      this.globalService.PostRequest(url,this.forgotPasswordForm.value)
      .subscribe(res => {
        if (res[0].json.json().error && res[0].json.json().error.object){
          this.globalService.showViaService('error','Error',res[0].json.json().error.object)
        }  
        else {
          this.globalService.showViaService('success','','Email Sent Successfully');
          this.router.navigateByUrl("dashboard/home");
          this.formInitialization();
        }
        this.showLoader = false;
        this.display = false;
        this.forgotPasswordForm.reset();
      }, 
      err => {
        this.showLoader = false;
        // this.loader = false;
        // this.globalService.consoleFun(err);
      })
    }
  }
}

