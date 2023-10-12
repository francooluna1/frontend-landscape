import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ActivityBoardComponent } from './pages/activity-board/activity-board.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityBoardComponent
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
