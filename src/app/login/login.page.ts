import { Component, OnInit } from '@angular/core';
import { Login } from '../classes/login';
import { UserService } from '../services/user.service';
import { JwtToken } from '../interfaces/jwt-token';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NotifyMessageService } from '../services/notify-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  data: Login = new Login("", "")

  constructor(
    private userService: UserService,
    private router: Router,
    private notifyMessageService: NotifyMessageService
  ) { }

  ngOnInit() {
  }

  async login() {
    const err = this.data.validationError;
    if (err) {
      await this.notifyMessageService.send(err)
      return 
    }
    this.userService.login(this.data).subscribe({
      next: (resp: JwtToken) => {
        this.userService.storeJwtToken(resp);
        this.router.navigate(['/home'])
      },
      error: async (error: any) => {
        await this.notifyMessageService.send("Login or password is invalid")
      }
    })
  }
}
