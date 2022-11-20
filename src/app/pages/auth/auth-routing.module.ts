import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'sign-up', loadChildren: () => import('./signup/sign-up.module').then(({ SignUpModule }: any) => SignUpModule) },
    { path: 'login', loadChildren: () => import('./login/login.module').then(({ LoginModule }: any) => LoginModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
