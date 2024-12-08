import {
  Component,
  Inject,
  HostBinding,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class AddTaskComponent implements OnInit {
  @HostBinding('@dialogAnimation') dialogAnimation = true;

  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  taskName: string = '';
  description: string = '';
  selectedIcons: string = '';
  selectedStatusType: string = '';
  icons: any[] = [
    'assets/dumbbel-svgrepo-com.svg',
    'assets/mind-svgrepo-com.svg',
    'assets/record-svgrepo-com.svg',
    'assets/e-learning-svgrepo-com.svg',
    'assets/student-svgrepo-com.svg',
    'assets/school-svgrepo-com.svg'
  ]
  statuses: any[] = [
    {
      key: 'Completed',
      value: 'completed'
    },
    {
      key: 'In Progress',
      value: 'pending'
    },
    // {
    //   key: 'In Progress',
    //   value: 'inprogress'
    // },
    {
      key: 'Wont Do',
      value: 'notdone'
    }
  ]
  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.taskName = this.data.taskName;
      this.description = this.data.description;
      this.selectedIcons = this.data.icon;
      this.selectedStatusType = this.data.status;
    }
    
  }
  addTask() {
    console.log(this.taskName, this.description);
    const task = {
      id: Math.ceil(Math.random()*100),
      taskName: this.taskName,
      description: this.description,
      icon: this.selectedIcons,
      status: this.selectedStatusType
    }
    this.dialogRef.close(task)
  }
  deleteTask(data: any){
    const deletedTask = {
      ...data,
      delete: true
    }
    this.dialogRef.close(deletedTask)
  }

  updateTask(data: any){
    const updatedTask = {
      id: data.id,
      taskName: this.taskName,
      description: this.description,
      icon: this.selectedIcons,
      status: this.selectedStatusType,
      update: true
    }
    this.dialogRef.close(updatedTask)
  }
  selectedIcon(icon: string) {
    this.selectedIcons = icon
    console.log(this.selectedIcons);

  }
  selectedStatus(status: string) {
    this.selectedStatusType = status
    console.log(this.selectedStatusType);
    
  }
}
