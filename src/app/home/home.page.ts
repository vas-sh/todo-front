import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  
  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskService.list().subscribe((resp: Task[]) => {
      this.tasks = resp;
    })
  }

  viewTask(id: number) {

  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe(() => {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id = id) {
          this.tasks.splice(i, 1);
          return 
        }
      }
    })
  } 
}
