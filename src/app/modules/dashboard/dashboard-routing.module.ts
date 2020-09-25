import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingreportsComponent } from './components/marketingreports/marketingreports.component';
import { MainComponent } from './components/main/main.component';
import { SigplusSignComponent } from './components/sigplus-sign/sigplus-sign.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'marketingreports',
        component: MarketingreportsComponent,
      },
      {
        path: 'sigplus-sign',
        component: SigplusSignComponent,
      },
      {
        path: 'onboarding',
        component: OnboardingComponent,
      },
      { path: '', redirectTo: 'sigplus-sign' },
      { path: '**', redirectTo: 'sigplus-sign' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
