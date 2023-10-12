import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Component } from '@angular/core'
import { Activity } from 'src/app/interfaces/Activity'
import { MatDialog } from '@angular/material/dialog'
import { NewActivityModalComponent } from './new-activity-modal/new-activity-modal.component'

@Component({
  selector: 'app-activity-board',
  templateUrl: './activity-board.component.html',
  styleUrls: ['./activity-board.component.scss']
})
export class ActivityBoardComponent {

  constructor(private dialog: MatDialog) { }

  activity: Activity = {
    activityId: 0,
    title: '',
    type: '',
    startDate: null,
    endDate: null,
    status: null
  }

  activityImages: Record<string, string> = {
    ACTIVITY: '../../../assets/images/activity.jpg',
    PARTY: '../../../assets/images/party.jpg',
    FOOD: '../../../assets/images/food.jpg',
  }

  //HACER UN GET DE LAS ACTIVIDADES, Y HACER PUSH DEPENDIENDO LA FECHA

  noDateAssigned: Activity[] = [
    {
      activityId: 1,
      title: 'Subida al cerro catedral',
      type: 'ACTIVITY',
      startDate: '2022-01-22 01:30:00',
      endDate: '2022-01-22 23:30:00',
      status: 'IN_PROGRESS',
    },
    {
      activityId: 2,
      title: 'Fiesta de espuma',
      type: 'PARTY',
      startDate: '2022-01-22 01:30:00',
      endDate: '2022-01-22 23:30:00',
      status: 'DONE'
    },
    {
      activityId: 3,
      title: 'Desayuno',
      type: 'FOOD',
      startDate: null,
      endDate: null,
      status: null
    }
  ]

  date1: Activity[] = []
  date2: Activity[] = []
  date3: Activity[] = []

  drop(event: CdkDragDrop<Activity[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  newActivity() {
    const dialogRef = this.dialog.open(NewActivityModalComponent, {
      width: '400px',
    })

    dialogRef.afterClosed().subscribe((result: Activity) => {
      if (result) {
        this.noDateAssigned.push({ ...result, activityId: this.noDateAssigned.length + 1 })
      }
    });
  }

  editActivity() {
    //
  }

  removeActivity(index: number, list: Activity[]) {
    if (index >= 0 && index < list.length) {
      list.splice(index, 1)
    }
  }
}
