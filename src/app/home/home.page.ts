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
import { Completion } from "../enums/completion";
import { ReportCompletion } from '../interfaces/report-completion';
import { WebsocketService } from '../services/websocket.service';
import { Events } from '../enums/events';

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
  event = Events;
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
  reportCompletion: { 
    completion: Completion;
    count: number;
    color: string;
    title: string;
    }[] = [
      {
        completion: Completion.DEADLINE_SOON, 
        count: 0,
        color: " #f8c345",
        title: "Deadline soon"
      },
      {
        completion: Completion.NOT_IN_TIME, 
        count: 0,
        color: " #f8c345",
        title: "Done not on time"
      },
      {
        completion: Completion.IN_TIME, 
        count: 0,
        color: " #3bc0af",
        title: "Done in time"
      },
      {
        completion: Completion.ACTIVE_OVERDUE, 
        count: 0,
        color: " #ad554f",
        title: "Actve overdue"
      },  
    ];

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private userService: UserService,
    private wsService: WebsocketService,
  ) {}

  ngOnInit(): void {
    this.refreshTasks();
    this.refreshReportStatuses();
    this.refreshReportCompletion();
    this.user = this.userService.currentUser();
    this.createConn();
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
      this.refreshTasks();
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

  createConn() {
    const token = this.userService.getJwtToken()
    this.wsService.connect(token!);
    this.wsService.messages.subscribe((msg) => {
      if (msg === this.event.UPDATED_TASK || msg === this.event.DELETED_TASK || msg === this.event.CREATED_TASK) {
        this.refreshReportCompletion();
        this.refreshReportStatuses();
        this.refreshTasks();
      }
    });
  }

  private refreshReportStatuses() {
    this.taskService.reportStatuses().subscribe((resp: ReportStatus) => {
      for (const status of this.reportStatuses) {
        switch (status.status) {
          case Status.NEW:
            status.count = resp.new_status;
            break;
          case Status.IN_PROGRESS:
            status.count = resp.in_progress;
            break;
          case Status.DONE:
            status.count = resp.done;
            break;
          case Status.CANCELED:
            status.count = resp.canceled;
            break;
        }
      }
    })
  }

  private refreshReportCompletion() {
     this.taskService.reportCompletion().subscribe((resp: ReportCompletion) => {
      for (const completion of this.reportCompletion) {
        switch (completion.completion) {
          case Completion.IN_TIME:
            completion.count = resp.in_time;
            break;
          case Completion.NOT_IN_TIME:
            completion.count = resp.not_in_time;
            break;
          case Completion.ACTIVE_OVERDUE:
            completion.count = resp.active_overdue;
            break;
          case Completion.DEADLINE_SOON:
            completion.count = resp.dead_line_soon;
            break;
        }
      }
    });
  }

  public refreshTasks() {
    this.taskService.list().subscribe((resp: ITask[]) => {
      this.tasks = resp;
    })
  }
}

