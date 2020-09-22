import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingreportsComponent } from './components/marketingreports/marketingreports.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'marketingreports',
        component: MarketingreportsComponent,
      },
      { path: '', redirectTo: 'marketingreports' },
      { path: '**', redirectTo: 'marketingreports' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
