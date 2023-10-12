import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Component, OnInit } from '@angular/core'
import { Activity } from 'src/app/interfaces/Activity'
import { MatDialog } from '@angular/material/dialog'
import { NewActivityModalComponent } from './new-activity-modal/new-activity-modal.component'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-activity-board',
  templateUrl: './activity-board.component.html',
  styleUrls: ['./activity-board.component.scss']
})
export class ActivityBoardComponent implements OnInit {

  activities: Activity[] = []
  noDateAssigned: Activity[] = []
  dateOne: Activity[] = []
  dateTwo: Activity[] = []
  dateThree: Activity[] = []

  activityImages: Record<string, string> = {
    ACTIVITY: '../../../assets/images/activity.jpg',
    PARTY: '../../../assets/images/party.jpg',
    FOOD: '../../../assets/images/food.jpg',
  }

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/getActivities`)
      .subscribe((data) => {
        this.activities = data.map(({ activityId, title, type, startDate, endDate, status }: Activity) => {
          return {
            activityId,
            title,
            type,
            startDate,
            endDate,
            status
          }
        })
        this.activities.forEach((res) => {
          this.availableDays(res)
        })
      })
  }

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
      width: '800px',
      height: '800px'
    })

    dialogRef.afterClosed().subscribe((result: Activity) => {
      if (result) {
        this.availableDays({ ...result, activityId: this.activities.length + 1 })
      }
    })
  }

  editActivity(index: number, list: Activity[]) {
    console.log(index)
    const dialogRef = this.dialog.open(NewActivityModalComponent, {
      width: '800px',
      height: '800px',
      data: { activity: { ...list[index] }, isEdit: true },
    })

    dialogRef.afterClosed().subscribe((result: Activity) => {
      if (result) {
        list.splice(index, 1)
        // Actualiza la actividad editada en la lista
        list[index] = result

        // Si se cambia la fecha de inicio, actualiza los arrays de fechas
        this.availableDays(result)
      }
    })
  }



  removeActivity(index: number, list: Activity[]) {
    if (index >= 0 && index < list.length) {
      list.splice(index, 1)
    }
  }

  availableDays(res: any) {
    console.log(res)
    const startDate = res.startDate ? new Date(res.startDate).toLocaleDateString() : null
    switch (startDate) {
      case '12/10/2023':
        this.dateOne.push(res)
        break;
      case '13/10/2023':
        this.dateTwo.push(res)
        break;
      case '14/10/2023':
        this.dateThree.push(res)
        break;
      default:
        this.noDateAssigned.push(res)
        break;
    }
  }
}
