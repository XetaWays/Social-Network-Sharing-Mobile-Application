import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { DatabaseService } from '../../services/database/database.service'
import { AlertsService } from '../../services/alerts/alerts.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss'],
})
export class ChangeEmailPage implements OnInit {

  public email:string;
  public checkName:string = "checkmark-outline"
  public eml:string;

  public btnhide = true;

  constructor(private navController:NavController, private db:DatabaseService, private alerts:AlertsService,private keyboard:Keyboard) { 
    const uid = localStorage.getItem('UserId')
    this.db.GetDataByUID(uid).then((data) => {
      this.email = String(data[uid]['email'])
    })
  }
  
  ngOnInit() {
  }

  closeEmail(){
    this.navController.navigateBack('/my-information');
  }

  checkEmail() {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regularExpression.test(this.eml)) {
      this.checkName = "close-outline"
    } else {
      this.checkName = "checkmark-outline"
    }
  }

  submit() {
    this.keyboard.hide()
    if(this.checkName == "close-outline") {
      this.alerts.defaultErrorAlert('invalid Email')
    } else {
      this.db.updateEmail(this.eml,false)
      this.navController.navigateBack('/my-information');
    }
  }

  leavephone(){
    this.btnhide = false;
  }

}
