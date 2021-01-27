import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatabaseService } from '../../services/database/database.service'

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.page.html',
  styleUrls: ['./my-information.page.scss'],
})
export class MyInformationPage implements OnInit {

  public Username:string;
  public email:string
  public phone:string = "Not added"

  constructor(private router:Router, private db:DatabaseService) {
    const uid = localStorage.getItem("UserId")
    this.db.GetDataByUID(uid).then((data) => {
      this.Username = data[uid]['username']
      this.email = data[uid]['email']
      if(data[uid]['phone']){
        this.phone = data[uid]['phone']
      }
    })
  }

  ngOnInit() {
  }

changePassword(){
  console.log('change password');
  this.router.navigate(['/change-password']);
}

changeEmail(){
  this.router.navigate(['/change-email']);
}

changeUsername(){
  this.router.navigate(['/change-username']);
}

  addMobile(){
this.router.navigate(['/add-mobile']);
  }
}


