import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'markets',
     loadChildren:() =>import('./markets/market.module').then(m => m.MarketModule)
    ,
  },
  {
    path:'**',
    redirectTo: "markets"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
