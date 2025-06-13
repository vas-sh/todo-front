import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.cleanJwtToken();
    this.router.navigate(['login']);
    this.popoverCtrl.dismiss()
  } 

  remove() {
    this.userService.remove().subscribe({
      next: () => {
        this.userService.cleanJwtToken();
        this.router.navigate(['login']);
        this.popoverCtrl.dismiss();
    }})
  }
}
