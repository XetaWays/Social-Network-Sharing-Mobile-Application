import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ads',
    loadChildren: () => import('./views/ads/ads.module').then(m => m.AdsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./views/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'follow-page',
    loadChildren: () => import('./views/follow-page/follow-page.module').then( m => m.FollowPagePageModule)
  },
  {
    path: 'add-mobile',
    loadChildren: () => import('./views/add-mobile/add-mobile.module').then( m => m.AddMobilePageModule)
  },
  {
    path: 'change-email',
    loadChildren: () => import('./views/change-email/change-email.module').then( m => m.ChangeEmailPageModule)
  },
  {
    path: 'change-username',
    loadChildren: () => import('./views/change-username/change-username.module').then( m => m.ChangeUsernamePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./views/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'my-information',
    loadChildren: () => import('./views/my-information/my-information.module').then( m => m.MyInformationPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'qrcode-generator',
    loadChildren: () => import('./views/qrcode-generator/qrcode-generator.module').then( m => m.QrcodeGeneratorPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./views/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'ads',
    loadChildren: () => import('./views/ads/ads.module').then( m => m.AdsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
