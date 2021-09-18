import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';

const routes: Routes = [
  {
    path : 'example',
    component : ExampleComponent
  },
  {
    path : '',
    pathMatch : 'full',
    redirectTo: 'example'
  },
  {
    path : '**',
    pathMatch : 'full',
    redirectTo: 'example'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
