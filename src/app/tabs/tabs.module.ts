import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { LongPressModule } from 'ionic-long-press';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicGestureConfig } from '../utils/IonicGestureConfig';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LongPressModule,
    TabsPageRoutingModule,
  ],
  providers:    [{provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}],

  declarations: [TabsPage]
})
export class TabsPageModule {}
