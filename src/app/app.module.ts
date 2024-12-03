import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { PortalComponent } from './portal/portal.component';
import { CardSetFormComponent } from './card-set-form/card-set-form.component';
import { UserSetsComponent } from './user-sets/user-sets.component';
import { DisplayCardSetComponent } from './display-card-set/display-card-set.component';
import { CardFormComponent } from './card-form/card-form.component';
import { HomeComponent } from './home/home.component';
// import AuthService from '../../utils/auth';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    PortalComponent,
    CardSetFormComponent,
    UserSetsComponent,
    DisplayCardSetComponent,
    CardFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
