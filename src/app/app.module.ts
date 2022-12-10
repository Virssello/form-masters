import { AppComponent } from './app.component';
import { AppLayoutModule } from '../layout/app.layout.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { ExitComponent } from './pages/exit/exit.component';
import { FoodModule } from './pages/food/food.module';
import { GlobalStoreModule } from './pages/global-store/global-store.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpRequestInterceptor } from '../shared/interceptors/http-request.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SharedModule } from '../shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    ExitComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    GlobalStoreModule,
    FoodModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
