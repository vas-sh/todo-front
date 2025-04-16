import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../interfaces/task';
import { ModalController } from '@ionic/angular';
import { TaskPage } from '../task/task.page';
import { Status } from '../enums/status';
import { Task } from '../classes/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  statuses = Status;
  tasks: ITask[] = [];
  
  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit(): void {
    this.taskService.list().subscribe((resp: ITask[]) => {
      this.tasks = resp;
      for (let i = 0; i < this.tasks.length; i++) {
        console.log(this.tasks[i].status == Status.DONE)
      }
    })
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
}

