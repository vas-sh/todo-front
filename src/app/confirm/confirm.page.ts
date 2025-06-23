import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginResp } from '../interfaces/login-resp';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
  standalone: false
})
export class ConfirmPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userService.confirm(params["id"]).subscribe({
        next: (resp: LoginResp) => {
          this.userService.storeJwtToken(resp);
          this.userService.storeUser(resp);
          this.router.navigate(['/home'])
        },
      })
    })
  }
}
