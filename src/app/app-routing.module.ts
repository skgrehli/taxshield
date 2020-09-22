import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  // }
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'register', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
