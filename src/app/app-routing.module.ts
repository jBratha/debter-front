import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  {path: '', component:TestComponent, data: {title: 'Strona główna'}},
  {path: 'meals', redirectTo:'/',data: {title: 'Posiłki'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
