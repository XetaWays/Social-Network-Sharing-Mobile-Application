import { Component, OnInit } from '@angular/core';

import { AlertsService } from '../../services/alerts/alerts.service'
import { EmailService } from '../../services/email/email.service'
import { UtilsService } from '../../services/utils/utils.service'

@Component({
  selector: 'app-radar',
  templateUrl: './radar.page.html',
  styleUrls: ['./radar.page.scss'],
})

export class RadarPage implements OnInit {

  public toggleOffline:boolean

  constructor(private alert:AlertsService, private email:EmailService,private utils:UtilsService) {
    this.toggleOffline = this.utils.OfflineActive()
   }

  ngOnInit() {
  }

  offCliked() {
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
