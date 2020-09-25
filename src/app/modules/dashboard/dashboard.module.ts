import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MarketingreportsComponent } from './components/marketingreports/marketingreports.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigplusSignComponent } from './components/sigplus-sign/sigplus-sign.component';
import { FormsModule } from '@angular/forms';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [MarketingreportsComponent, MainComponent, NavbarComponent, SigplusSignComponent, OnboardingComponent],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, MatStepperModule],
})
export class DashboardModule {}
