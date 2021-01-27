import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../services/database/database.service'

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
})

export class AdsPage implements OnInit {

  public Username:string;
  public title;
  public subtitle;

  public view:boolean = false;
  public click:boolean = true;
  public follow:boolean = false;  

  public valueEC:string
  public valuePrice:string

  constructor(private db:DatabaseService) {
    this.db.getUsernameById().then((data) => {
      this.Username = String(data)
    })
   }

  ngOnInit() {
  }

  eventChange(event:any){
    switch (event) {
      case 'view':
        this.click = false;
        this.follow = false;
        this.view = !this.view
        break;
      case 'click':
        this.view = false;
        this.follow = false;
        this.click = !this.click
        break;
      case 'follow':
        this.click = false;
        this.view = false;
        this.follow = !this.follow
        break;
    }

  }

  InputPriceChange(from:string, value:string){
    if(value){
      try {
      const parsedValue = parseInt(value.replace(/ /g,''));

      if(from == "event") {
        if(this.view){
          this.valuePrice = String(parsedValue*0.1) + " €"
        } else if(this.click){
          this.valuePrice = String(parsedValue*0.5) + " €"
        } else {
          this.valuePrice = String(parsedValue*1) + " €"
        }

      } else {
        if(this.view){
          this.valueEC = String(parsedValue*10) 
        } else if(this.click){
          this.valueEC = String(parsedValue*2)
        } else {
          this.valueEC = String(parsedValue*1)
        }
      }

      } catch (error) {
        this.valueEC = null
        this.valuePrice = null
      }
    } else {
      this.valueEC = null
      this.valuePrice = null
    }
  }

  

  submit() {
    var ev;
    if(this.view){
      ev = "view"
    } else if(this.click){
      ev = "click"
    } else {
      ev = "follow"
    }
    //PAID
    this.db.uploadAds(this.title, this.subtitle, ev, this.valueEC, this.valuePrice)
  }

}
