import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import { DatetimePageModule } from '../components/datetime/datetime.module';
import { DatefmtPipe } from '../pipes/datefmt.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    DatetimePageModule,
    DatefmtPipe
  ],
  declarations: [TaskPage],
  exports: [TaskPage],
})
export class TaskPageModule {}
