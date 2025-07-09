import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationInfoPage } from './registration-info.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationInfoPageRoutingModule {}
