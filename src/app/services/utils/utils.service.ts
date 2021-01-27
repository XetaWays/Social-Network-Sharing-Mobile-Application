import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';

import { DatabaseService } from '../database/database.service'

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router, private db:DatabaseService, public httpClient: HttpClient) { }

  checkLoged(){
    if(!localStorage.getItem("UserId")) {
      this.router.navigate(['/', 'login']);
    }
  }

  checkRegPages(){
    if(localStorage.getItem("UserId")){
      this.router.navigate(['/', 'tabs']);
    }
  }

  Notification() {

    FCM.getToken().then(token => {

      this.db.notificationToken(token)
    });


    FCM.onTokenRefresh().subscribe(token => {
      this.db.notificationToken(token)
    });

    FCM.hasPermission().then(() => {
     
    })
    
    FCM.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
  }

  scanNotif(type:string, toId:string) {
    this.db.GetDataByUID(toId).then(
      (value) => { 
        const fullname = value[toId]['name']
        var words = fullname.split(' ');
        words = words[0]
        words = words.charAt(0).toUpperCase()+ words.substring(1);
        const title:string = "Hey "+words+", Someone stalks you"

        this.db.GetDataByUID(localStorage.getItem("UserId")).then(
          (value) => { 
            var username = value[toId]['username']
            username = username.charAt(0).toUpperCase()+ username.substring(1);

            let msg;
            switch (type) {
              case "scan":
                msg = username+" has arrived on your profile by scanning your qr code."
                break;
              case "code":
                msg = username+" came to your profile by entering your friend code."
                break;
              case "close":
                msg = username+" came to your profile through close friends."
              break;
            }
            var registrationToken = 'AAAA5BmBWAs:APA91bETZssXl4lvjXr5M549WNA7XmFKKs2nakNEuJCOCI2qEuDuRzflReRaxftGEbUOUOa58gX4GcJ35NRli1-ERGzjK4f4NOPmlsOIC8z1FFBRmKcglmDEBkmrzRB0vhMsWJOpWiE-';
            let url = 'https://fcm.googleapis.com/fcm/send';
            let body = 
              {
                "notification": {
                    "title": title,
                    "body": msg,
                    "sound": "default",
                    "click_action": "FCM_PLUGIN_ACTIVITY",
                    "icon": "fcm_push_icon"
                },
                "to": value[toId]['FcmToken']
              };
        
            this.httpClient.post(url, body, {headers: {
              'content-type': 'application/json',
              'Authorization': 'key='+registrationToken
            }})
          
          })

        })
    
  }

  updateOffline(data:any){
    var date = new Date();
    let time;
    switch (String(data)) {
      case "1":
        time = date.setHours(date.getHours() + 1).toString();
        break;
      case "4":
        time = date.setHours(date.getHours() + 4).toString();
        break;
      case "24":
        time = date.setHours(date.getHours() + 24).toString();
        break;
      case "100":
        time = "Unlimited"
        break;
    }
    localStorage.setItem("Offline", time)
    }

  OfflineActive():boolean {
    const offline = localStorage.getItem('Offline')

    if(offline == "Unlimited") {
      return true
    } else {    
      var date = new Date();
      var datec = date.setHours(date.getHours())
      
      if(Number(datec) < Number(offline)){
        return true
      } else {
        return false
      }
    }
  }

}
