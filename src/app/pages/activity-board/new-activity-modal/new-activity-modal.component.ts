import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Activity } from 'src/app/interfaces/Activity'
import { StatusActivity } from 'src/app/interfaces/StatusActivity'
import { TypeActivity } from 'src/app/interfaces/TypeActivity'

@Component({
  selector: 'app-new-activity-modal',
  templateUrl: './new-activity-modal.component.html',
  styleUrls: ['./new-activity-modal.component.scss']
})
export class NewActivityModalComponent implements OnInit {

  formGroup!: FormGroup
  minDate: Date
  maxDate: Date
  isEdit: boolean = false
  startTime: Date = new Date()
  endTime: Date = new Date()

  typeActivity: TypeActivity[] = [
    { value: 'ACTIVITY', viewValue: 'Actividad' },
    { value: 'PARTY', viewValue: 'Fiesta' },
    { value: 'FOOD', viewValue: 'Comida' },
  ]

  statusActivity: StatusActivity[] = [
    { value: 'IN_PROGRESS', viewValue: 'En progreso' },
    { value: 'DONE', viewValue: 'Terminado' },
  ]

  constructor(
    public dialogRef: MatDialogRef<NewActivityModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { activity: Activity; isEdit: boolean },
  ) {

    this.minDate = new Date('2023-10-12 00:00:00')
    this.maxDate = new Date('2023-10-14 00:00:00')

    const currentDate = new Date()

    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      startDate: [currentDate, Validators.required],
      endDate: [currentDate, Validators.required],
      status: [null, Validators.required],
    }, { validators: this.dateRangeValidator })

    if (this.data && this.data.isEdit) {
      const startDateString: string | null = this.data.activity.startDate
      const endDateString: string | null = this.data.activity.endDate
      if(startDateString !== null && endDateString !== null) {
        const startDateObject = new Date(startDateString)
        const endDateObject = new Date(endDateString)

        this.formGroup.patchValue({
          title: this.data.activity.title,
          type: this.data.activity.type,
          startDate: startDateObject,
          endDate: endDateObject,
          status: this.data.activity.status,
        })
      }
    }
  }

  ngOnInit() {
    this.startTime = this.formGroup.get('startDate')?.value
    this.endTime = this.formGroup.get('endDate')?.value
  }

  submit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value as Activity
      this.dialogRef.close(formData)
    }
  }

  cancel(): void {
    this.dialogRef.close()
  }

  dateRangeValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value
    const endDate = formGroup.get('endDate')?.value

    if (startDate && endDate && startDate > endDate) {
      formGroup.get('endDate')?.setErrors({ invalidRange: true })
    } else {
      formGroup.get('endDate')?.setErrors(null)
    }
  }

  onDateChange(event: any) {
    const selectedDate = event.value
    const newStartTime = new Date(selectedDate)
    const newEndTime = new Date(selectedDate)

    newStartTime.setHours(this.startTime.getHours())
    newStartTime.setMinutes(this.startTime.getMinutes())

    newEndTime.setHours(this.endTime.getHours())
    newEndTime.setMinutes(this.endTime.getMinutes())

    this.formGroup.get('startDate')?.setValue(newStartTime)
    this.formGroup.get('endDate')?.setValue(newEndTime)
  }
}
