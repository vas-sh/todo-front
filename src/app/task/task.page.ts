import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../classes/task';
import { TaskService } from '../services/task.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { ITask } from '../interfaces/task';
import { Status } from '../enums/status';
import { DatetimePage } from '../components/datetime/datetime.page';

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
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }
  
  save() {
    this.changeEsimateTime()
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

  changeEsimateTime() {
    if (this.task.estimateTime) {
      this.task.estimateTime = (new Date(this.task.estimateTime)).toJSON();
    } else {
      this.task.estimateTime = undefined;
    }
  }

  async openDateTime(ev: any) {
    const modal = await this.popoverCtrl.create({
      component: DatetimePage,
      componentProps: {
        obj: this.task,
        fieldName: "estimateTime"
      },
      event: ev, 
    })
    modal.onDidDismiss().then((value: any ) => {
      
    })
    modal.present()
  }
}
