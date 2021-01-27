import { Injectable } from '@angular/core';

import { Sim } from '@ionic-native/sim';

import { DatabaseService } from '../../services/database/database.service'
import { AlertsService } from '../../services/alerts/alerts.service'


@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private alert:AlertsService) {
   }

  async getPhoneNumberFromSim(){
    return new Promise(resolve => {
      Sim.hasReadPermission().then(
        (info) => {
          if(info){
            Sim.getSimInfo().then(
              (info) => {
                resolve(info['phoneNumber'])
              }
            );
          } else {
            Sim.requestReadPermission().then(
              () => {
                Sim.getSimInfo().then(
                  (info) => {
                    resolve(info['phoneNumber'])
                  })
              },
              () => resolve(null)
            );
          }
        }
      );

    })
  }


  async loginIA(){
    return new Promise(resolve => {
      this.alert.askFromSim().then((data) => {
        if(data){
          this.getPhoneNumberFromSim().then((data) => resolve(data))
        } else {
          this.alert.EnterSource("phone").then((data) => {
            if(data)
              resolve(data['Input'])
            else 
              resolve(null)
          })
        }
      })
    })
  }


}
