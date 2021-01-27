import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMobilePage } from './add-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: AddMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMobilePageRoutingModule {}
