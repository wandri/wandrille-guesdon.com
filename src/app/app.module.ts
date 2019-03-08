import {BrowserModule, Title} from '@angular/platform-browser';
import {isDevMode, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {MainComponent} from './main/main.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {CardComponent} from './card/card.component';
import {ResumeModule} from './resume/resume.module';
import {MessageService} from './contact/message.service';
import {MatButtonModule} from "@angular/material/button";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {firebaseConfig} from "../firebase-config";

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FooterComponent,
    MenuComponent,
    MainComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    ResumeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [Title, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
