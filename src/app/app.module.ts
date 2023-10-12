//Module Angular
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Components
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'

//Pages
import { ActivityBoardComponent } from './pages/activity-board/activity-board.component'
import { ActivityComponent } from './pages/activity/activity.component'

//Material
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { NewActivityModalComponent } from './pages/activity-board/new-activity-modal/new-activity-modal.component'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [
    AppComponent,
    ActivityBoardComponent,
    SidebarComponent,
    ActivityComponent,
    NewActivityModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
