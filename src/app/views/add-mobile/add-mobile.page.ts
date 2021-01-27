import { Component, OnInit } from '@angular/core';
import {countryCodes} from "../../shared/country-codes";
import { NavController } from '@ionic/angular';

import { AlertsService } from '../../services/alerts/alerts.service'
import { DatabaseService } from '../../services/database/database.service'
import { PhoneService } from '../../services/phone/phone.service'

import { Sim } from '@ionic-native/sim';

import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.page.html',
  styleUrls: ['./add-mobile.page.scss'],
})
export class AddMobilePage implements OnInit {

  public startPhone:string;
  public phone:string;
  public checkName:string = "checkmark-outline";
  public placeholder:string;

  public btnhide = true;

  dialCodes:any[]=[];
  constructor(private navController:NavController, private alerts:AlertsService, private db:DatabaseService,private phones:PhoneService, private keyboard:Keyboard) { 
    
    const uid = localStorage.getItem("UserId")
    this.db.GetDataByUID(uid).then((data) => {
      if(data[uid]['phone']){
        this.startPhone = data[uid]['phone']
      } else {
        this.placeholder = "769-432-811"
        this.alerts.askFromSim().then((data) => {

          if(data){
            Sim.hasReadPermission().then((info) => {
              if(!info){
                Sim.requestReadPermission().then(
                  () => {
                    this.updatePhoneSim()
                  }
                );
              } else {
                this.updatePhoneSim()
              }
            }
          );
          } else {

          }

        }
        )
      }
    })
  }


  updatePhoneSim(){
    var that = this;
    this.phones.getPhoneNumberFromSim().then((data) => {
      this.startPhone = String(data);
      that.db.updatePhone(String(data),true);
    })
  }

  ngOnInit() {
    this.dialCodes=countryCodes;
  }

  closeMobile(){
    this.navController.navigateBack('/my-information');
  }

  submit() {
    this.keyboard.hide();

    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if(this.phone) {
      if(regex.test(this.phone)) {
        if(this.startPhone != this.phone) {
            this.db.updatePhone(this.phone,false);
        }
        this.navController.navigateBack('/my-information');
      } else {
        this.alerts.defaultErrorAlert("Invalid phone number")
      }
    } else {
      this.alerts.defaultErrorAlert("Please enter your phone number")
    }
  }

  leavephone(){
    this.btnhide = false
  }

  hideKeyboard(){
    this.keyboard.hide()
  }

}
