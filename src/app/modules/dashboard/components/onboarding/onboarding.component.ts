import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  isLinear: boolean = false;
  currentStep = 0;

  stepsCompletion = [false, false, false, false, false];

  constructor() { }

  ngOnInit(): void {
  }

}
