import { Component, OnInit } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

import { UtilsService } from 'src/app/services/utils/utils.service';
import { DatabaseService } from 'src/app/services/database/database.service';

import { Camera } from "@ionic-native/camera/ngx"; 

import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.page.html',
  styleUrls: ['./scan-code.page.scss'],
})
export class ScanCodePage implements OnInit {

  public socialMediaBoxVisible:boolean=false;
  public scanHidden:boolean = false;

  public camera:string = "back"


  public code:string;

  public scanSub:any

  constructor(private bld: BLE ,private qrScanner: QRScanner, private router:Router, private alertService: AlertsService, 
    private cameraPl: Camera, private utils:UtilsService, private db:DatabaseService) {
    this.scanCode()
   }

  ngOnInit() {
    this.scanCode()
  }

  ionViewWillLeave() {
    this.qrScanner.hide();
    this.scanSub.unsubscribe(); 
  }

  scanCode() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
          this.qrScanner.show()
         // start scanning
         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
           if(text.includes(environment.url)) {
              text = text.replace(environment.url, "")

                this.db.CheckUsername(text).then((data) => {
                  if(data) {
                    this.db.getUsernameById().then((data) => {
                      if(data != text) {             
                        this.utils.scanNotif("scan", text)
                        let navigationExtras: NavigationExtras = { state: { UID: text } };
                        this.router.navigate(['/', 'follow-page'], navigationExtras);
                      } else {
                        this.alertService.defaultErrorAlert("This Qr is yours !")
                        this.scanCode()
                      }
                    })
                  } else {
                    this.alertService.defaultErrorAlert("This Qr Code Is Invalid")
                    this.scanCode()
                  }

                })
    
           } else {
              this.alertService.defaultErrorAlert("This Qr Code Is Invalid")
              this.scanCode()
           }

           this.qrScanner.hide();
           this.scanSub.unsubscribe(); 
         });
  
       } else if (status.denied) {
         // camera permission was permanently denied
         // must QRScanner.openSettings() method 
       } else {
         // permission denied, but not permanently. 
       }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  invertScan() {
    if(this.camera == "back") {
      this.qrScanner.useFrontCamera()
      this.camera = "front"
    } else {
      this.qrScanner.useBackCamera()
      this.camera = "back"
    }
  }

  toggleSocialMediaBox(){
    this.socialMediaBoxVisible=!this.socialMediaBoxVisible;
  }

  submitCode() {
    if(this.code) {
      this.db.CheckUsername(this.code.toLowerCase()).then((data) => {
        if(data) {
          this.db.getUsernameById().then((uname) => {
            if(data != uname) {  
              this.code = null
              this.utils.scanNotif("scan", String(data))
              let navigationExtras: NavigationExtras = { state: { UID: data } };
              this.router.navigate(['/', 'follow-page'], navigationExtras);
            } else {
              this.alertService.defaultErrorAlert("This Username is yours !")
            }
          })
        } else {
          this.alertService.defaultErrorAlert("This Username Is Invalid")
        }
      })
    } else {
      this.alertService.defaultErrorAlert("Please Enter A Code")
    }
  }

  openGallery () {
    var imgSrc;
    let cameraOptions = {
      sourceType: this.cameraPl.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.cameraPl.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.cameraPl.EncodingType.JPEG,      
      correctOrientation: true
    }
    
    this.cameraPl.getPicture(cameraOptions)
      .then(file_uri => imgSrc = file_uri, 
      err => console.log(err));   
  }

  searchBarOnFocus(){
    this.scanHidden = true;
  }

  searchBarLoseFocus(){
    this.scanHidden = false;
  }

  scan(){

  }

}
