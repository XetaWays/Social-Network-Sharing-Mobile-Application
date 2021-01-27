import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowPagePageRoutingModule } from './follow-page-routing.module';

import { FollowPagePage } from './follow-page.page';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowPagePageRoutingModule
  ],
  providers: [
    Contacts
  ],
  declarations: [FollowPagePage]
})
export class FollowPagePageModule {}
