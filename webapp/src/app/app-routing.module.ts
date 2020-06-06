import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageviewerComponent } from './pageviewer/pageviewer.component';
import { YaliyomoComponent } from './yaliyomo/yaliyomo.component';

const routes: Routes = [
  { path: 'pages/:page', component: PageviewerComponent },
  { path: '', component: YaliyomoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
