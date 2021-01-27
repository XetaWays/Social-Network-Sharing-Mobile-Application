import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMobilePageRoutingModule } from './add-mobile-routing.module';

import { AddMobilePage } from './add-mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMobilePageRoutingModule
  ],
  declarations: [AddMobilePage]
})
export class AddMobilePageModule {}
