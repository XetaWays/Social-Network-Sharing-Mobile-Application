import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertsService } from '../../services/alerts/alerts.service'
import { DatabaseService } from'../../services/database/database.service'

import { UtilsService } from '../../services/utils/utils.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email:string;
  public password:string;

  public namePwd:string = "eye";
  public typePwd:string = "password"

  constructor(private router:Router, private alertService:AlertsService, private databaseService: DatabaseService, private utils:UtilsService,private keyboard:Keyboard) {
    this.utils.checkRegPages()
   }

  ngOnInit() {
  }

   login() {
    this.keyboard.hide()
    if(!this.email) {
      this.alertService.defaultErrorAlert("Enter Your Email, Phone, or Username");
    } else if(!this.password){
      this.alertService.defaultErrorAlert("Enter Your password");
    } else {
      this.email = this.email.toLowerCase();
      this.databaseService.loginUsername(this.email, this.password).then(
        (value) => { 
          if(value) {
            localStorage.setItem('UserId', String(value))
            this.utils.Notification()
            this.router.navigate(['/', 'tabs']);
          } else {
            this.databaseService.loginEmail(this.email, this.password).then(
              (value) => { 
                if(value) {
                  localStorage.setItem('UserId', String(value))
                  this.utils.Notification()
                  this.router.navigate(['/', 'tabs']);
                } else {
                  this.databaseService.loginPhone(this.email, this.password).then(
                    (value) => { 
                      if(value) {
                        localStorage.setItem('UserId', String(value))
                        this.utils.Notification()
                        this.router.navigate(['/', 'tabs']);
                      } else {
                        this.alertService.defaultErrorAlert("This Username or Password is invalid")
                      }
                    })
                }
              })
          }

        })
    }
   }

   switchPwd(){
    if(this.namePwd == "eye") {
      this.namePwd = "eye-off"
      this.typePwd = "text"
    } else {
      this.namePwd = "eye"
      this.typePwd = "password"
    }
  }

}
