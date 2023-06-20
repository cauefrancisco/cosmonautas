import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from 'src/app/components/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/components/layout/header/header.component';
import { MainLayoutComponent } from 'src/app/components/layout/main-layout/main-layout.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { IntroComponent } from 'src/app/pages/home/components/intro/intro.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ScheduleComponent } from 'src/app/pages/schedule/schedule.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ScheduleComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
