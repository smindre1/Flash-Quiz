import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { QuizComponent } from './quiz/quiz.component';
import { UserSetsComponent } from './user-sets/user-sets.component';

const routes: Routes = [
  { path: 'login+signup', component: PortalComponent },
  { path: 'quiz', component: QuizComponent},
  { path: 'flashcard-sets', component: UserSetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
