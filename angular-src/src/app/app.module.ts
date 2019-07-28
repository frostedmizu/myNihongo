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
import { ReadingComponent } from './components/reading/reading.component';
import { ScoreComponent } from './components/score/score.component';
import { EditVocabComponent } from './components/edit-vocab/edit-vocab.component';
import { ReadingAnswersComponent } from './components/reading-answers/reading-answers.component';
import { EditReadingComponent } from './components/edit-reading/edit-reading.component';
import { AddReadingModalComponent } from './components/add-reading-modal/add-reading-modal.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGaurd]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGaurd]},
  {path:'vocab', component: VocabComponent, canActivate:[AuthGaurd]},
  {path:'score', component: ScoreComponent, canActivate:[AuthGaurd]},
  {path:'reading', component: ReadingComponent, canActivate:[AuthGaurd]},
  {path:'editVocab', component: EditVocabComponent, canActivate:[AuthGaurd]},
  {path:'readingAnswers', component: ReadingAnswersComponent, canActivate:[AuthGaurd]},
  {path:'editReading', component: EditReadingComponent, canActivate:[AuthGaurd]}
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
    AddQuestionModalComponent,
    ReadingComponent,
    ScoreComponent,
    EditVocabComponent,
    ReadingAnswersComponent,
    EditReadingComponent,
    AddReadingModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [AddQuestionModalComponent, AddReadingModalComponent],
  providers: [ValidateService, AuthService, AuthGaurd, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
