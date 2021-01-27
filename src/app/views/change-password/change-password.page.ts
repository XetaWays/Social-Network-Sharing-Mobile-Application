import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { DatabaseService } from '../../services/database/database.service'
import { AlertsService } from '../../services/alerts/alerts.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(private navController:NavController, private db:DatabaseService, private alerts:AlertsService,private keyboard:Keyboard) { }

  public current:string;
  public password:string;
  public repeatPassword:string;

  public nameCurrent:string = "eye";
  public namePassword:string = "eye";
  public nameRPassword:string = "eye";

  public currentType:string = "password"
  public passwordType:string = "password"
  public repeatPasswordType:string = "password"

  ngOnInit() {
  }

  closePassword(){
    this.navController.navigateBack('/my-information');
  }

  switchEyeCurrent() {
    if(this.nameCurrent == "eye") {
      this.nameCurrent = "eye-off"
      this.currentType = "text"
    } else {
      this.nameCurrent = "eye"
      this.currentType = "password"
    }
  }

  switchEyepassword() {
    if(this.namePassword == "eye") {
      this.namePassword = "eye-off"
      this.passwordType = "text"
    } else {
      this.namePassword = "eye"
      this.passwordType = "password"
    }
  }

  switchEyeRpassword() {
    if(this.nameRPassword == "eye") {
      this.nameRPassword = "eye-off"
      this.repeatPasswordType = "text"
    } else {
      this.nameRPassword = "eye"
      this.repeatPasswordType = "password"
    }
  }

  submit(){
    this.keyboard.hide()
    if(!this.current){
      this.alerts.defaultErrorAlert("Please your current password")
    } else if(!this.password) {
      this.alerts.defaultErrorAlert("Please enter the new password")
    } else if(!this.repeatPassword) {
      this.alerts.defaultErrorAlert("Please repeat your password")
    } else if(this.repeatPassword != this.repeatPassword) {
      this.alerts.defaultErrorAlert("The password do not match")
    } else if(this.current == this.password) {
      this.alerts.defaultErrorAlert("The new password can not be the same as the old")
    } else {
      this.db.updatePassword(this.current, this.password).then((data) => {
        if(data) {
          this.navController.navigateBack('/my-information');
        } else {
          this.alerts.defaultErrorAlert("Invalid Password")
        }
      })
    }
  }

}
