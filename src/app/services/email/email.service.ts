import { Injectable } from '@angular/core';

import { AlertsService } from '../../services/alerts/alerts.service'
import { DatabaseService } from '../../services/database/database.service'

import '../../../assets/smtp.js'; 


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private alerts:AlertsService,private db:DatabaseService) { 
  }


  async loginIA(){
    const uid = localStorage.getItem("UserId");
    return new Promise(resolve => {
      this.alerts.askEmailFromdb().then((data) => {
        if(data){
          this.db.GetDataByUID(uid).then((data) => {
            resolve(data[uid]["email"])
          })
        } else {
          this.alerts.EnterSource("Email").then((data) => {
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
