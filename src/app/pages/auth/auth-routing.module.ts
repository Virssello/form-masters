import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'register', loadChildren: () => import('./register/register.module').then(({ RegisterModule }: any) => RegisterModule) },
    { path: 'login', loadChildren: () => import('./login/login.module').then(({ LoginModule }: any) => LoginModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
