import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage   {

  @ViewChild('myTabs') tabs: IonTabs;

  selectedTab:string;

  constructor(private router:Router) {}

  ngOnInit(){}

  active(){
    alert("long")
  }


  getSelectedTab(){
    this.selectedTab=this.tabs.getSelected();
  }

}
