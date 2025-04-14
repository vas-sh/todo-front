import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../classes/task';
import { TaskService } from '../services/task.service';
import { ModalController } from '@ionic/angular';
import { ITask } from '../interfaces/task';
import { Status } from '../enums/status';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: false,
})
export class TaskPage implements OnInit {
  @Input() task: Task = new Task(0, "", Status.NEW);

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  
  save() {
    if (this.task.id) {
      this.taskService.update(this.task).subscribe((resp: any) =>{
        this.modalCtrl.dismiss(this.task)
      })
      return
    }
    this.taskService.create(this.task).subscribe((resp: ITask) => {
      this.modalCtrl.dismiss(resp)
    })
  } 

  close() {
    this.modalCtrl.dismiss();
  }
}
