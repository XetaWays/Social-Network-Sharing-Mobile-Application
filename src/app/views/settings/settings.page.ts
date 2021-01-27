import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { DatabaseService } from '../../services/database/database.service'
import { AlertsService } from '../../services/alerts/alerts.service'
import { UtilsService } from '../../services/utils/utils.service'

import * as firebase from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public sourcePP = "../../assets/profile_pictures.jpg";

  public notifScan;
  public smsScan;
  public emailScan;

  public toggleOffline:boolean;

  constructor(private router:Router,private camera: Camera, private db:DatabaseService, private alert:AlertsService,private utils:UtilsService) {
    this.setPP()
    this.setOn()
    this.toggleOffline = this.utils.OfflineActive()
   }

  ngOnInit() {
  }

  myInformation(){
    this.router.navigate(['/my-information'])
  }

  contactUs() {
    let navigationExtras: NavigationExtras = { state: { UID: "JOIND" } };
    this.router.navigate(['/', 'follow-page'], navigationExtras);
  }

  ads(){
    this.router.navigate(['/ads'])
  }

  async chagePP() {
    const libraryImage = await this.openLibrary();
    await this.db.uploadProfilePictures(libraryImage)
    this.setPP()
  }
  
  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  setPP() {
    var storage = firebase.storage();
    var pathReference = storage.ref('profile_pictures/'+localStorage.getItem("UserId")+'.png');
    pathReference.getDownloadURL().then((data) => {
      if(data){
        this.sourcePP = data
      } else {
        this.sourcePP = "../../assets/profile_pictures.jpg"
      }
    })
  }

  setOn(){
    const uid = localStorage.getItem("UserId")
    this.db.GetDataByUID(uid).then((data) => {
      const onScan = String(data[uid]['onScan'])

        //ON SCAN
      if(onScan.includes("notif")){
        this.notifScan = true
      }
      if(onScan.includes("sms")){
        this.smsScan = true
      }
      if(onScan.includes("email")){
        this.emailScan = true
      }

    })
  }

  updateRadio(name:string) {
    const uid = localStorage.getItem('UserId')
    this.db.GetDataByUID(uid).then((data) => {
      const onScan = String(data[uid]['onScan'])

      if(!onScan.includes(name)){
        this.db.updateScan(onScan+name)
      } else {
        this.db.updateScan(onScan.replace(name, ""))
      }

    })
  }

  Offline(){
    if(!this.toggleOffline) {
      this.alert.OfflineModeRadio().then((data) => {
        
        if(data == "aborted" || !data) {
          this.toggleOffline = false;
        } else {
          this.utils.updateOffline(data)
        }

      })
    } else {
      localStorage.setItem("Offline","")
    }
  }

}
