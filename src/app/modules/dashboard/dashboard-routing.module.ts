import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingreportsComponent } from './components/marketingreports/marketingreports.component';
import { MainComponent } from './components/main/main.component';
import { SigplusSignComponent } from './components/sigplus-sign/sigplus-sign.component';

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
