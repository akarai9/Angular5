import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { GlobalService } from './../GlobalService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;	   
  showLoader:boolean = false;

  constructor(public fb:FormBuilder, public globalService: GlobalService, public router:Router ) { }

  ngOnInit() {
  	this.formInitialization();
  }
  
  formInitialization = () =>{
  	this.signUpForm = this.fb.group({
  		email:['',{ updateOn:'blur', validators:[Validators.required]}],
      name:['',{ updateOn:'blur', validators:[Validators.required]}],
      cnfPassword:['',{ updateOn:'blur', validators:[Validators.required]}],
  		password:['',{ updateOn:'blur', validators:[Validators.required]}]
  	},{ updateOn: 'submit' })
  }

   signUp() {
      this.showLoader=true;
      this.globalService.consoleFun(this.signUpForm.value);
      this.signUpForm.value.password = window.btoa(this.signUpForm.value.password); // for encrypt/decrypt password
      const url = this.globalService.basePath + 'admin/admin-users/add'
      this.globalService.PostRequest(url , this.signUpForm.value)
          .subscribe(res => {
          /*Save Logged in user Data in the Localstorage for later use*/
          // this.globalService.showViaService('success','','Login Successfully');
          // res[0].json.status_code == 200 ? this.globalService.showViaService('success','','Login Successfully') : this.globalService.showViaService('warn','Error',res[0].json.error.object);
       
       
      },err =>{
          this.showLoader=false;
          this.formInitialization();
          // this.globalService.showLoginAlert("Network Failure!."); 
        })
    } 
}
