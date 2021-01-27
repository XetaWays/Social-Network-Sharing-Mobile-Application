import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DatabaseService } from '../../services/database/database.service'
import { AlertsService } from '../../services/alerts/alerts.service'

import * as firebase from 'firebase';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-follow-page',
  templateUrl: './follow-page.page.html',
  styleUrls: ['./follow-page.page.scss'],
})
export class FollowPagePage implements OnInit {

  public UID:string;

  public Username:string = ""; 
  private email:string;
  private phone:string;
  private name:string;
  public sourcePP = "../../assets/profile_pictures.jpg";


  socialMedias:any[]=[
    {
    name:'facebook',
    icon:'assets/icons/facebook.png',
    username:'',
    show:false,
  },
  {
    name:'instagram',
    icon:'assets/icons/instagram.png',
    username:'',
    show:false,
  },
  {
    name:'tiktok',
    icon:'assets/icons/ticktock.png',
    username:'',
    show:false,
  },
  {
    name:'twitter',
    icon:'assets/icons/twitter.png',
    username:'',
    show:false,
  },
  {
    name:'youtube',
    icon:'assets/icons/youtube.png',
    username:'',
    show:false,
  },
  {
    name:'snapchat',
    icon:'assets/icons/snapchat.png',
    username:'',
    show:false,
  },
  {
    name:'spotify',
    icon:'assets/icons/spotify.png',
    username:'',
    show:false,
    click:'link'
  },
  {
    name:'twitch',
    icon:'assets/icons/twitch.png',
    username:'',
    show:false,
  },
  {
    name:'pinterest',
    icon:'assets/icons/pinterest.png',
    username:'',
    show:false,
  },
  {
    name:'snphone',
    icon:'assets/icons/phone.png',
    username:'',
    show:false,
  },
  {
    name:'snemail',
    icon:'assets/icons/emailIcon.png',
    username:'',
    show:false,
  }
]
  

  constructor(private route: ActivatedRoute, private router: Router, private db:DatabaseService,private iab:InAppBrowser, private contacts: Contacts, private alert:AlertsService) {
    this.route.queryParams.subscribe(params => {
      try {
        this.retrieveData(this.router.getCurrentNavigation().extras.state.UID)
        this.setPP(this.router.getCurrentNavigation().extras.state.UID)
      } catch {
        this.router.navigate(['/', 'tabs'])
      }
    });


  }

  ngOnInit() { }

  Join(index:number) {
    let contact: Contact = this.contacts.create();
    switch (this.socialMedias[index].name) {
      case "facebook":
          this.iab.create("https://facebook.com/"+this.socialMedias[index].username, '_system'); 
        break;
      case "instagram":
          this.iab.create("https://instagram.com/"+this.socialMedias[index].username, '_system'); 
        break;
      case "tiktok":
          this.iab.create("https://tiktok.com/@"+this.socialMedias[index].username, '_system'); 
        break;
      case "twitter":
        this.iab.create("https://twitter.com/"+this.socialMedias[index].username, '_system'); 
      break;
    case "youtube":
        this.iab.create("https://www.youtube.com/results?search_query="+encodeURIComponent(this.socialMedias[index].username), '_system'); 
      break;
    case "snapchat":
        //////////////////this.iab.create("snapchat://search", "_system")
      break;
    case "spotify":
        this.iab.create("https://open.spotify.com/user/"+this.socialMedias[index].username, '_system');
      break;
    case "spotify":
        this.iab.create("https://twitch.com/"+this.socialMedias[index].username, '_system');
      break;
    case "pinterest":
        this.iab.create("https://pinterest.com/"+this.socialMedias[index].username, '_system');
      break;
    case "snphone":
        contact.name = new ContactName(null, this.name, '');
        contact.phoneNumbers = [new ContactField('mobile', this.phone)];
        contact.emails = [new ContactField('email', this.email)];
        contact.save().then(
          () => {
            this.alert.defaultErrorAlert("Contact Saved !")
          },
          (error: any) => this.alert.defaultErrorAlert("Error While saving contact !")
        );

      break
    case "snemail":
        contact.name = new ContactName(null, this.name, '');
        contact.phoneNumbers = [new ContactField('mobile', this.phone)];
        contact.emails = [new ContactField('email', this.email)];
        contact.save().then(
          () => {
            this.alert.defaultErrorAlert("Contact Saved !")
          },
          (error: any) => this.alert.defaultErrorAlert("Error While saving contact !")
        );

      break
    }

  }

  retrieveData(uid:string){
    var that=this;
    //SET USERNAME GLOBAL
    this.db.GetDataByUID(uid).then((data) => {
      const uname = data[uid]['username']
      this.Username = String(uname).charAt(0).toUpperCase()+ String(uname).substring(1);
      this.email = data[uid]['snemail']
      this.phone = data[uid]['snphone']
      this.name = data[uid]['name']
      this.setSN(data[uid])
    })

  }

  setSN(data){
    if(data['facebook']){
      this.socialMedias[0].show = true
      this.socialMedias[0].username = data['facebook']
    }
    if(data['instagram']){
      this.socialMedias[1].show = true
      this.socialMedias[1].username = data['instagram']
    }
    if(data['tiktok']){
      this.socialMedias[2].show = true
      this.socialMedias[2].username = data['tiktok']
    }
    if(data['twitter']){
      this.socialMedias[3].show = true
      this.socialMedias[3].username = data['twitter']
    }
    if(data['youtube']){
      this.socialMedias[4].show = true
      this.socialMedias[4].username = data['youtube']
    }
    if(data['snapchat']){
      this.socialMedias[5].show = true
      this.socialMedias[5].username = data['snapchat']
    }
    if(data['spotify']){
      this.socialMedias[6].show = true
      this.socialMedias[6].username = data['spotify']
    }
    if(data['twitch']){
      this.socialMedias[7].show = true
      this.socialMedias[7].username = data['twitch']
    }
    if(data['pinterest']){
      this.socialMedias[8].show = true
      this.socialMedias[8].username = data['pinterest']
    }
    if(data['snphone']){
      this.socialMedias[9].show = true
      this.socialMedias[9].username = data['snphone']
    }
    if(data['snemail']){
      this.socialMedias[10].show = true
      this.socialMedias[10].username = data['snemail']
    }
  }

  setPP(uid:string){
    var storage = firebase.storage();
    var pathReference = storage.ref('profile_pictures/'+uid+'.png');
    pathReference.getDownloadURL().then((data) => {
      if(data){
        this.sourcePP = data
      } else {
        this.sourcePP = "../../assets/profile_pictures.jpg"
      }
    })
  }

}
