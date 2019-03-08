import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { ResumeModule } from './resume/resume.module';
import { MessageService } from './contact/message.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

export const firebaseConfig = {
  apiKey: 'AIzaSyBo9QO3XbdWkYzxfxG-RtyiGo8oSWsPuVI',
  authDomain: 'siteperso-3a985.firebaseapp.com',
  databaseURL: 'https://siteperso-3a985.firebaseio.com',
  projectId: 'siteperso-3a985',
  storageBucket: 'siteperso-3a985.appspot.com',
  messagingSenderId: '5113977087'
};

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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    ResumeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [Title, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
