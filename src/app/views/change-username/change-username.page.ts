import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { DatabaseService } from '../../services/database/database.service'
import { AlertsService } from '../../services/alerts/alerts.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.page.html',
  styleUrls: ['./change-username.page.scss'],
})
export class ChangeUsernamePage implements OnInit {

  public username:string;
  public checkName:string = "checkmark-outline"
  public unme:string;
  public boolstart:boolean = true;

  public btnhide:boolean = true;

  constructor(private navController:NavController, private db:DatabaseService, private alerts:AlertsService,private keyboard:Keyboard) { 
    this.db.getUsernameById().then((data) => {
      this.username = String(data)
    })

  }

  ngOnInit() {
  }

  closeUsername(){
    this.navController.navigateBack('/my-information');
  }

  submit() {
    this.keyboard.hide()
    if(this.checkName == "close-outline") {
      this.alerts.defaultErrorAlert('invalid Username')
    } else {
      this.db.updateUsername(this.unme)
      this.navController.navigateBack('/my-information');
    }
  }

  checkUsername() {
    const ume = this.unme.replace(/ /g,'')
    if(this.unme) {
      if(ume) {
        this.db.usernameExist(this.unme).then((data) => {
          if(data) {
            if(this.boolstart) {
              this.boolstart = false;
            } else {
            this.checkName = "close-outline"
            }
          } else {
            this.checkName = "checkmark-outline"
          }
        })
      } else {
        this.checkName = "close-outline"
      }
    } else {
      this.checkName = "close-outline"
    }
  }

  leavephone(){
    this.btnhide=false
  }

}
