import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicGestureConfig } from './utils/IonicGestureConfig';
import { LongPressModule } from 'ionic-long-press';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorPickerModule } from 'ngx-color-picker';


import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

import { FCM } from '@ionic-native/fcm/ngx';

import { HttpClientModule } from '@angular/common/http';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { Keyboard } from '@ionic-native/keyboard/ngx';

import { DeviceAccounts } from '@ionic-native/device-accounts/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { BLE } from '@ionic-native/ble/ngx';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,        
    LongPressModule,
    HttpClientModule,
    ColorPickerModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    BLE,
    SplashScreen,
    Keyboard,
    InAppBrowser,
    DeviceAccounts,
    AndroidPermissions,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
