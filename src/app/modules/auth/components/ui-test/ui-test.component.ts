import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-test',
  templateUrl: './ui-test.component.html',
  styleUrls: ['./ui-test.component.scss']
})
export class UiTestComponent implements OnInit {

  isLoginWindowActive: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleWindow(flag){
    console.log(flag);
    
    this.isLoginWindowActive = flag
  }

}
