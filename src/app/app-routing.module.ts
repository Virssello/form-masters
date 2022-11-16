import { AppLayoutComponent } from '../layout/app.layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path:'',
          component: LandingComponent
        },
        {
          path: 'home',
          component: AppLayoutComponent,
          children: [
            {
              path: '',
              loadChildren: () => import('./pages/dashboard/dashboard.module').then(({ DashboardModule }: any) => DashboardModule)
            },
            {
              path: 'user',
              loadChildren: () => import('./pages/user/user.module').then(({ UserModule }: any) => UserModule)
            },
            {
              path: 'food',
              loadChildren: () => import('./pages/food/food.module').then(({ FoodModule }: any) => FoodModule)
            },
            {
              path: 'settings',
              loadChildren: () => import('./pages/settings/settings.module').then(({ SettingsModule }: any) => SettingsModule)
            },
          ],
        },
        {
          path: 'auth',
          loadChildren: () => import('./pages/auth/auth.module').then(({ AuthModule }: any) => AuthModule),
        },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
