import { Component, OnInit } from '@angular/core';
import { CreateTask } from '../classes/create-task';
import { TaskService } from '../services/task.service';
import { ModalController } from '@ionic/angular';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: false,
})
export class CreateTaskPage implements OnInit {
  task: CreateTask = new CreateTask("", "");

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  
  save() {
    this.taskService.create(this.task).subscribe((resp: Task) => {
      this.modalCtrl.dismiss(resp)
    })
  } 
}
