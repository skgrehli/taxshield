import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingreportsComponent } from './marketingreports.component';

describe('MarketingreportsComponent', () => {
  let component: MarketingreportsComponent;
  let fixture: ComponentFixture<MarketingreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
