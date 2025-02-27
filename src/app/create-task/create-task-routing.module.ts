import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTaskPage } from './create-task.page';

const routes: Routes = [
  {
    path: 'task',
    component: CreateTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTaskPageRoutingModule {}
