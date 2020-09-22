import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MarketingreportsComponent } from './components/marketingreports/marketingreports.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [MarketingreportsComponent, MainComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
