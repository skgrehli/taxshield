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

import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    MarketingreportsComponent,
    MainComponent,
    NavbarComponent,
    SigplusSignComponent,
    OnboardingComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatStepperModule,
    MatStepperModule,

    MatGridListModule,

    MatListModule,

    MatSidenavModule,

    MatToolbarModule,
    MatExpansionModule
  ],
})
export class DashboardModule {}
