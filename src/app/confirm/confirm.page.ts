import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';

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
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userService.confirm(params["id"]).subscribe((resp: any) => {
        console.log(resp)
      })
    })
  }

}
