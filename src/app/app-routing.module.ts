import { AppLayoutComponent } from '../layout/app.layout.component';
import { ExitComponent } from './pages/exit/exit.component';
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
          ]
        },
        {
          path: 'auth',
          loadChildren: () => import('./pages/auth/auth.module').then(({ AuthModule }: any) => AuthModule),
        },
        {
          path: 'login-measurement',
          loadChildren: () => import('./pages/login-measurement/login-measurement.module').then(({ LoginMeasurementModule }: any) => LoginMeasurementModule),
        },
        { path: 'notfound', component: NotfoundComponent },
        { path: 'exit', component: ExitComponent },
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
