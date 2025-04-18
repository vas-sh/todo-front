import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
  standalone: false
})
export class DatetimePage implements OnInit {
  @Input() obj: any;  
  @Input() fieldName: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}
