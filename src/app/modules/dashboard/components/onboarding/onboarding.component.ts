import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  // material stepper element ref
  @ViewChild('stepper') private myStepper: MatStepper;

  isLinear: boolean = false;
  currentStep = 0;

  stepsCompletion = [false, false, false, false];

  constructor() {}

  ngOnInit() {
    
  }

  ngAfterViewInit(){

    this.previousStepCompleted(2)
    this.currentStep = 2;

    //subscribe step change events
    this.myStepper.selectionChange.subscribe(event => {
      console.log(event, 'emitted...');
      this.stepsCompletion[event.previouslySelectedIndex] =  true
    });
  }

  previousStepCompleted(index) {
    // makes the previous steps completed
    while (this.myStepper.selectedIndex < index) {
      this.stepsCompletion[this.myStepper.selectedIndex] = true;
      this.myStepper.selectedIndex += 1;
    }
  }

}
