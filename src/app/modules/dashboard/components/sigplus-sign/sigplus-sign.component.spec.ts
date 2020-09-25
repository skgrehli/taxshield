import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigplusSignComponent } from './sigplus-sign.component';

describe('SigplusSignComponent', () => {
  let component: SigplusSignComponent;
  let fixture: ComponentFixture<SigplusSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigplusSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigplusSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
