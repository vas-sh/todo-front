import { Component, OnInit } from '@angular/core';
import { Login } from '../classes/login';
import { UserService } from '../services/user.service';
import { JwtToken } from '../interfaces/jwt-token';

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
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.data).subscribe((resp: JwtToken) => {
      this.userService.storeJwtToken(resp)
    }) 
  }
}
