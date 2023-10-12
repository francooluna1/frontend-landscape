import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Activity } from 'src/app/interfaces/Activity';

@Component({
  selector: 'app-new-activity-modal',
  templateUrl: './new-activity-modal.component.html',
  styleUrls: ['./new-activity-modal.component.scss']
})
export class NewActivityModalComponent {

  constructor(public dialogRef: MatDialogRef<NewActivityModalComponent>) { }

  activity: Activity = {
    activityId: 0,
    title: '',
    type: '',
    startDate: null,
    endDate: null,
    status: null,
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  addActivity(): void {
    this.dialogRef.close(this.activity);
  }

  // private isFormValid(): boolean {
  //   return (
  //     this.activity.title && this.activity.type && this.activity.startDate && this.activity.endDate && this.activity.status
  //   )
  // }
}
