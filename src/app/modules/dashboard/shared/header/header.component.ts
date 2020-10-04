import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('logoName') logoName;
  @Input('headingName') headingName;
  @Input('isClearFilterVisible') isClearFilterVisible = false;
  @Input('isExportVisible') isExportVisible = false;
  @Input('isFilterVisible') isFilterVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
