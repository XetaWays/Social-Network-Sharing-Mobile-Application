import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import { IonicModule } from '@ionic/angular';

import { QrcodeGeneratorPageRoutingModule } from './qrcode-generator-routing.module';

import { QrcodeGeneratorPage } from './qrcode-generator.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorPickerModule,
    QrcodeGeneratorPageRoutingModule
  ],
  providers: [
    
  ],
  declarations: [QrcodeGeneratorPage]
})
export class QrcodeGeneratorPageModule {}
