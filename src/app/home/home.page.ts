import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../interfaces/task';
import { ModalController, PopoverController } from '@ionic/angular';
import { TaskPage } from '../task/task.page';
import { Status } from '../enums/status';
import { Task } from '../classes/task';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { AccountPage } from '../account/account.page';
import { ReportStatus } from '../interfaces/report-status';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  statuses = Status;
  tasks: ITask[] = [];
  user?: User;
  reportStatuses: { 
    status: Status;
    count: number;
    color: string;
    title: string;
    }[] = [
      {
        status: Status.NEW, 
        count: 0,
        color: " #f8c345",
        title: "New"
      },
      {
        status: Status.IN_PROGRESS, 
        count: 0,
        color: " #f8c345",
        title: "In Progress"
      },
      {
        status: Status.DONE, 
        count: 0,
        color: "#3bc0af",
        title: "Done"
      },
      {
        status: Status.CANCELED, 
        count: 0,
        color: " #ad554f",
        title: "Canceled"
      },
    ];

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.taskService.list().subscribe((resp: ITask[]) => {
      this.tasks = resp;
    })
    this.taskService.reportStatuses().subscribe((resp: ReportStatus[]) => {
      for (const item of resp) {
        for (const status of this.reportStatuses) {
          if (item.status == status.status) {
            status.count = item.count;
            break;
          }
        }
      }
    })
    this.user = this.userService.currentUser();
  }

  async editTask(task: ITask) {
    const modal = await this.modalCtrl.create({
      component: TaskPage,
      cssClass: "modal-view",
      componentProps: {
        task: Task.fromITask(task),
      }
    })
    modal.onDidDismiss().then((value: any ) => {
      if (!value.data) {
        return;
      }
      for (let i = 0; i < this.tasks.length; i ++) {
        if (this.tasks[i].id == task.id) {
          this.tasks[i] = Task.fromITask(value.data).serialize();
          break;
        }
      }
    })
    await modal.present()
  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe(() => {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id == id) {
          this.tasks.splice(i, 1);
          return 
        }
      }
    })
  } 

  async add() {
    const modal = await this.modalCtrl.create({
      component: TaskPage,
      cssClass: "modal-view"
    })
    modal.onDidDismiss().then((value: any ) => {
      if (!value.data) {
        return;
      }
      if (this.tasks.length) {
        this.tasks.push(this.tasks[0]);
        this.tasks[0] = value.data;  
      } else {
        this.tasks.push(value.data)
      }
    })
    await modal.present()
  }

  async openAccount(ev: any) {
    const modal = await this.popoverCtrl.create({
      component: AccountPage,
      event: ev,
    })
    await modal.present()
  }
}

