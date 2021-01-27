import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrcodeGeneratorPage } from './qrcode-generator.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodeGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrcodeGeneratorPageRoutingModule {}
