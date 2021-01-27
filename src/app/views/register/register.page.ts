import { Component, OnInit } from '@angular/core';

import { AlertsService } from '../../services/alerts/alerts.service'

import { DatabaseService } from'../../services/database/database.service'
import { Router } from '@angular/router';

import { UtilsService } from '../../services/utils/utils.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private alertService: AlertsService, private db:DatabaseService, private router:Router, private utils: UtilsService,private keyboard:Keyboard) { 
    this.utils.checkRegPages()
  }

  public namePwd:string = "eye"; 
  public nameRPwd:string = "eye";

  public typePwd:string = "password"
  public typeRPwd:string = "password"

  ngOnInit() {
  }

  public name:string;
  public username:string;
  public email:string;
  public password:string;
  public rpassword:string;
  public gender:any;

  register() {
    this.keyboard.hide()
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!this.name) {
      this.alertService.defaultErrorAlert("Enter Your Name");
    } else if(!this.username){
      this.alertService.defaultErrorAlert("Enter Your Username");
    } else if(!this.email){
      this.alertService.defaultErrorAlert("Enter Your Email");
    } else if(!this.password){
      this.alertService.defaultErrorAlert("Enter Your Password");
    } else if(!this.rpassword){
      this.alertService.defaultErrorAlert("Repeat Your Password");
    } else if(!regularExpression.test(this.email)){
      this.alertService.defaultErrorAlert("Invalid Email");
    } else if(this.password != this.rpassword){
      this.alertService.defaultErrorAlert("Password Do not match");
    } else if(!this.gender){
      this.alertService.defaultErrorAlert("Chose your gender");
    }  else {    
      this.db.usernameExist(this.username).then(
      (value) => {
        if(value){
          this.alertService.defaultErrorAlert("This Username already exist");
        } else {
          this.db.registerUser(this.name.toLocaleLowerCase(), this.username.replace(/ /g,"").toLocaleLowerCase(), this.email.toLocaleLowerCase().replace(" ",""), this.password, this.gender).then(
            (value) => { 
            
              if(value){
                localStorage.setItem('UserId', String(value))
                this.utils.Notification()
                this.router.navigate(['/', 'tabs']);
              }
            })
        }
      })

    }
    
  }

  //#region pwd eye
  switchPwd(){
    if(this.namePwd == "eye") {
      this.namePwd = "eye-off"
      this.typePwd = "text"
    } else {
      this.namePwd = "eye"
      this.typePwd = "password"
    }
  }
  switchRPwd(){
    if(this.nameRPwd == "eye") {
      this.nameRPwd = "eye-off"
      this.typeRPwd = "text"
    } else {
      this.nameRPwd = "eye"
      this.typeRPwd = "password"
    }
  }
  //#endregion

}
