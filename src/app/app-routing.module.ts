import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { LoginformComponent } from './loginform/loginform.component';

const routes: Routes = [
  { path: '', pathMatch:'full',redirectTo:"loginform"},
  { path: 'loginform', component:LoginformComponent},
  { path: 'component1', component:  Component1Component },
  { path: 'component2', component:  Component2Component },
   { path: 'component2/:id', component:  Component2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

