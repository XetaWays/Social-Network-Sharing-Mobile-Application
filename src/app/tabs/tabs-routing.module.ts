import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'radar',
        loadChildren: () => import('../views/radar/radar.module').then(m => m.RadarPageModule)
      },
      {
        path: 'scan-code',
        loadChildren: () => import('../views/scan-code/scan-code.module').then( m => m.ScanCodePageModule)   
         },
      {
        path: 'share-code',
        loadChildren: () => import('../views/share-code/share-code.module').then( m => m.ShareCodePageModule)
      },
      {
        path: 'settings', 
        loadChildren: () => import("../views/settings/settings.module").then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/radar',
        pathMatch: 'full'
      }
    
    ],

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
