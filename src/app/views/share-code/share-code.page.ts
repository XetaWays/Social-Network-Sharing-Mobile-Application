import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../../services/database/database.service'
import { AlertsService } from '../../services/alerts/alerts.service'
import { PhoneService } from '../../services/phone/phone.service'
import { EmailService } from '../../services/email/email.service'

@Component({
  selector: 'app-share-code',
  templateUrl: './share-code.page.html',
  styleUrls: ['./share-code.page.scss'],
})
export class ShareCodePage implements OnInit {

  socialMedias:any[]=[{
    name:'facebook',
    icon:'assets/icons/facebook.png',
    username:'Facebook',
    connected:false
  },
  {
    name:'instagram',
    icon:'assets/icons/instagram.png',
    username:'Instagram',
    connected:false
  },
  {
    name:'tiktok',
    icon:'assets/icons/ticktock.png',
    username:'TikTok',
    connected:false
  },
  {
    name:'twitter',
    icon:'assets/icons/twitter.png',
    username:'Twitter',
    connected:false
  },
  {
    name:'youtube',
    icon:'assets/icons/youtube.png',
    username:'Youtube',
    connected:false
  },
  {
    name:'snapchat',
    icon:'assets/icons/snapchat.png',
    username:'Snapchat',
    connected:false
  },
  {
    name:'spotify',
    icon:'assets/icons/spotify.png',
    username:'Spotify',
    connected:false
  },
  {
    name:'twitch',
    icon:'assets/icons/twitch.png',
    username:'Twitch',
    connected:false
  },
  {
    name:'pinterest',
    icon:'assets/icons/pinterest.png',
    username:'Pinterest',
    connected:false
  },
  {
    name:'snphone',
    icon:'assets/icons/phone.png',
    username:'Phone',
    connected:false
  },
  {
    name:'snemail',
    icon:'assets/icons/emailIcon.png',
    username:'Email',
    connected:false
  }

]

  public Username:string = ""; 

  constructor(private router:Router, private db:DatabaseService, private alert:AlertsService,private phone:PhoneService,private email:EmailService) { 
    const uid = localStorage.getItem('UserId')
    this.db.getUsernameById().then((data) => {
      this.Username = String(data).charAt(0).toUpperCase()+ String(data).substring(1);
    })

    this.db.GetDataByUID(uid).then((data) => {
      if(data[uid]['facebook']) {
        this.socialMedias[0].username = data[uid]['facebook']
        this.socialMedias[0].connected = true
      }
      if(data[uid]['instagram']) {
        this.socialMedias[1].username = data[uid]['instagram']
        this.socialMedias[1].connected = true
      }
      if(data[uid]['tiktok']) {
        this.socialMedias[2].username = data[uid]['tiktok']
        this.socialMedias[2].connected = true
      }
      if(data[uid]['twitter']) {
        this.socialMedias[3].username = data[uid]['twitter']
        this.socialMedias[3].connected = true
      }
      if(data[uid]['youtube']) {
        this.socialMedias[4].username = data[uid]['youtube']
        this.socialMedias[4].connected = true
      }
      if(data[uid]['snapchat']) {
        this.socialMedias[5].username = data[uid]['snapchat']
        this.socialMedias[5].connected = true
      }
      if(data[uid]['spotify']) {
        this.socialMedias[6].username = data[uid]['spotify']
        this.socialMedias[6].connected = true
      }
      if(data[uid]['twitch']) {
        this.socialMedias[7].username = data[uid]['twitch']
        this.socialMedias[7].connected = true
      }
      if(data[uid]['pinterest']) {
        this.socialMedias[8].username = data[uid]['pinterest']
        this.socialMedias[8].connected = true
      }
      if(data[uid]['snphone']) {
        this.socialMedias[9].username = data[uid]['snphone']
        this.socialMedias[9].connected = true
      }
      if(data[uid]['snemail']) {
        this.socialMedias[10].username = data[uid]['snemail']
        this.socialMedias[10].connected = true
      }
    })

  }

  ngOnInit() {
  }

  addQrCode(){
    this.router.navigate(['/qrcode-generator'])
  }

  connectMedia(index:number){
    this.socialMedias[index].connected=true;
    if(this.socialMedias[index].name == "snphone"){
      this.phone.loginIA().then((data) => {
        if(data){
          this.socialMedias[index].username = data
          this.db.setSocialNetwork("snphone", String(data))
        } else {
          this.socialMedias[index].connected = false
          this.socialMedias[index].username = "Phone"
        }
      })
    } else if(this.socialMedias[index].name == "snemail"){
      this.email.loginIA().then((data) => {
        if(data){
          this.socialMedias[index].username = data
          this.db.setSocialNetwork("snemail", String(data))
        } else {
          this.socialMedias[index].connected = false
          this.socialMedias[index].username = "Email"
        }
      })
    } else {
      this.alert.enterUname(this.socialMedias[index].name).then((data) => {
        if(data){
          this.socialMedias[index].username = data['uname']
          this.db.setSocialNetwork(this.socialMedias[index].name, data['uname'])
        } else {
          this.socialMedias[index].connected=false;
        }
      })
    }
  }

  disconnectMedia(index:number) {
    this.socialMedias[index].connected=false;
    this.db.rmSocialNetworks(this.socialMedias[index].name)

    let name = String(this.socialMedias[index].name).charAt(0).toUpperCase()+ String(this.socialMedias[index].name).substring(1);
    if(this.socialMedias[index].name == "snemail") {
      name = 'Email'
    } else if(this.socialMedias[index].name == "snphone") {
      name = 'Phone'
    }
    this.socialMedias[index].username = name
  }

}
