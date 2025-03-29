import { Component, OnInit } from '@angular/core';
import { SignUp } from '../classes/sign-up';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {
  data: SignUp = new SignUp("", "", "")

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  save() {
    this.userService.signUp(this.data).subscribe((resp: User) => {
      console.log(resp)
    })
  }

}
