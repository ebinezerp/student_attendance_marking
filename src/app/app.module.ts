import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AgmCoreModule } from '@agm/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { QrGenerateScreenComponent } from './qr-generate-screen/qr-generate-screen.component';

@NgModule({
  declarations: [AppComponent, QrGenerateScreenComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, NgxQRCodeModule, AgmCoreModule.forRoot({
    apiKey: 'AIzaSyD6HAtWiEGmG_zNo2dGuCyDu2i0y-_l0Us',
    libraries: ['places']
  }), IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    QrGenerateScreenComponent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
