import { Injectable } from '@angular/core';

import { AlertsService } from '../../services/alerts/alerts.service'

import * as firebase from 'firebase';

import * as CryptoJS from 'crypto-js'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private alertService: AlertsService) { }

  async registerUser(name:string, username:string, email:string, password:string, gender:string){
    return new Promise(resolve => {
      firebase.database().ref('/users/').push({
        username:username,
        name:name,
        email:email,
        emailVerified: false,
        password:this.encrypt(password),
        gender:gender,
        power:1,
        phone: null,
        phoneVerified: false,
        onScan: "notif",
        onSuspect: "email",
        date: new Date()
      }).then((snap) => {
        resolve(snap.key)
      })
    });
  }

  async usernameExist(username:string) {
    return new Promise(resolve => {
    
    firebase.database().ref('/users/')
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then(snapshot => snapshot.val())
    .then((data) => 
    {
      if(data){
        resolve(true);
      } else {
        resolve(false);
      }
    })
    });
  }

  async loginUsername(username:string, password:string){
    return new Promise(resolve => {
      firebase.database().ref('/users/')
      .orderByChild('username')
      .equalTo(username)
      .once('value')
      .then(snapshot =>  
      {
        if(snapshot.val()) {
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var passwordQ = childSnapshot.val().password;

            var bytes = CryptoJS.AES.decrypt(passwordQ, environment.shadow);
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            if(decryptedData == password) {
              resolve(childKey)
            } else {
              resolve(null)
            }
          });
        } else {
          resolve(null)
        }
      }).catch((error) => {
        resolve(null)
      })
      });
  }

  async loginEmail(email:string, password:string) {
    return new Promise(resolve => {
      firebase.database().ref('/users/')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot =>  
      {
        if(snapshot.val()) {
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var passwordQ = this.decrypt(childSnapshot.val().password);

            var bytes = CryptoJS.AES.decrypt(passwordQ, environment.shadow);
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            if(decryptedData == password) {
              resolve(childKey)
            } else {
              resolve(null)
            }

          });
        } else {
          resolve(null)
        }
      }).catch((error) => {
        resolve(null)
      })
      });
  }

  async loginPhone(phone:string, password:string) {
    return new Promise(resolve => {
      firebase.database().ref('/users/')
      .orderByChild('phone')
      .equalTo(phone)
      .once('value')
      .then(snapshot =>  
      {
        if(snapshot.val()) {
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var passwordQ = this.decrypt(childSnapshot.val().password);

            var bytes = CryptoJS.AES.decrypt(passwordQ, environment.shadow);
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            if(decryptedData == password) {
              resolve(childKey)
            } else {
              resolve(null)
            }
          });
        } else {
          resolve(null)
        }
      }).catch((error) => {
        resolve(null)
      })
      });
  }

  encrypt(text:string):string {
    return CryptoJS.AES.encrypt(text, environment.shadow).toString();
  }

  notificationToken(token:string) {
    const id = localStorage.getItem("UserId")
    firebase.database().ref('/users/'+id).update({
      FcmToken:token,
    })
  }

  async GetDataByUID(uid:string){
    return new Promise(resolve => {
      firebase.database().ref('/users/')
      .orderByKey()
      .equalTo(uid)
      .once('value')
      .then(snapshot =>  
      {
        resolve(snapshot.val())
      });
    });
  }

  async CheckUsername(uname:string){
    return new Promise(resolve => {
      firebase.database().ref('/users/')
      .orderByChild('username')
      .equalTo(uname)
      .once('value')
      .then(snapshot =>  
      {
        if(snapshot){
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            resolve(childKey)

          });
        } else {
          resolve(null)
        }
      });
    });
  }
  
  async getUsernameById(){
    const uid = localStorage.getItem("UserId")
    return new Promise(resolve => {
      firebase.database().ref('/users/')
      .orderByKey()
      .equalTo(uid)
      .once('value')
      .then(snapshot =>  
      {
        resolve(snapshot.val()[uid]['username'])
      });
    });
  }

  async updatePassword(current:string, newP:string) {
    const uid = localStorage.getItem("UserId")
    return new Promise(resolve => {
      firebase.database().ref('/users/')
      .orderByKey()
      .equalTo(uid)
      .once('value')
      .then(snapshot =>  
      {
        var password = snapshot.val()[uid]['password']
        var bytes = CryptoJS.AES.decrypt(password, environment.shadow);
        var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        if(current == decryptedPassword){
          firebase.database().ref('/users/'+uid).update({
            password:this.encrypt(newP),
          }).then(() => resolve("OK"))
        } else {
          resolve(null)
        }

      });
    });
  }

  updateUsername(username:string) {
    const uid = localStorage.getItem("UserId")
    firebase.database().ref('/users/'+uid).update({
      username:username,
    })
  }

  updateEmail(email:string, verified:boolean) {
    const uid = localStorage.getItem("UserId")
    firebase.database().ref('/users/'+uid).update({
      email:email,
      emailVerified:verified
    })
  }

  updatePhone(phone:string, verified:boolean) {
    const uid = localStorage.getItem("UserId")
    firebase.database().ref('/users/'+uid).update({
      phone:phone,
      phoneVerified: verified,
    })
  }

  uploadProfilePictures(img:any){
    var storageRef = firebase.storage().ref();
    var mountainsRef = storageRef.child("profile_pictures/"+localStorage.getItem('UserId')+".png");
    mountainsRef.putString(img, 'base64')
  }

  updateScan(updted:string){
    const uid = localStorage.getItem("UserId")
    firebase.database().ref('/users/'+uid).update({
      onScan:updted,
    })
  }

  setSocialNetwork(type:string, username:string){
    const uid = localStorage.getItem("UserId")
    firebase.database().ref('/users/'+uid).update({
      [type]:username
    })
  }

  rmSocialNetworks(type:string){
    const uid = localStorage.getItem("UserId")
    firebase.database().ref('/users/'+uid).update({
      [type]:null      
    });
  }


  uploadAds(title:string, subtitle:string, ev:string, valueCount:any, totalpaid:string) {
    const uid = localStorage.getItem('UserId')
    firebase.database().ref('/ads/').push({
      userid:uid,
      title:title,
      subtitle:subtitle,
      event: ev,
      TotalValueCount:valueCount,
      ValueCountLeft:valueCount,
      totalPaid:totalpaid,
      paid:true,
      start: new Date()
    })
  }



}
