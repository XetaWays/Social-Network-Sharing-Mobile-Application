import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanCodePageRoutingModule } from './scan-code-routing.module';

import { ScanCodePage } from './scan-code.page';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { Camera } from "@ionic-native/camera/ngx"; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanCodePageRoutingModule
  ],
  providers: [
    QRScanner,
    Camera
  ],
  declarations: [ScanCodePage]
})
export class ScanCodePageModule {}
