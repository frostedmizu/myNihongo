import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VocabComponent } from './components/vocab/vocab.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGaurd } from './guards/auth.guard';
import { ActivityService } from './services/activity.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AddQuestionModalComponent } from './components/add-question-modal/add-question-modal.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGaurd]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGaurd]},
  {path:'vocab', component: VocabComponent, canActivate:[AuthGaurd]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    VocabComponent,
    AddQuestionModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [AddQuestionModalComponent],
  providers: [ValidateService, AuthService, AuthGaurd, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
