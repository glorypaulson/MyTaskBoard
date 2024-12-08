import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss']
})
export class DashboardLandingComponent {
  constructor(private dailog: MatDialog) { }

  tasks: any[] = [
    // {
    //   taskName: 'Angular',
    //   description: 'create an angular app',
    //   icon: 'assets/Time_atack_duotone.svg',
    //   status: 'completed'
    // },
    // {
    //   taskName: 'React',
    //   description: 'create a react app',
    //   icon: 'assets/react_logo.svg',
    //   status: 'pending'
    // },
    // {
    //   taskName: 'Vue',
    //   description: 'create a vue app',
    //   icon: 'assets/vue_logo.svg',
    //   status: 'inprogress'
    // },
    // {
    //   taskName: 'Node.js',
    //   description: 'create a node.js app',
    //   icon: 'assets/nodejs_logo.svg',
    //   status: 'notdone'
    // }
  ]
  openDailog(task?: any) {
    this.dailog.open(AddTaskComponent, {
      height: '95%',
      width: '700px',
      enterAnimationDuration: 500,
      data: task
      // position: { top: '0%', left: '50%'},
      // panelClass: 'slide-in-dialog', // Add a unique class
    }).afterClosed().subscribe((res) => {
      if (res) {
        if (res.delete) {
          const index = this.tasks.findIndex(t => t.id === res.id)
          this.tasks.splice(index, 1)
        }
        else if (res.update) {
          const index = this.tasks.findIndex(t => t.id === res.id)
          this.tasks[index] = res
        }
        else {
          this.tasks.push(res)
        }
        console.log(this.tasks);
      }
    })

  }
}
