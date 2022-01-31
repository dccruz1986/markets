import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './market.component';
import { MarketDetailsComponent } from './market-details/market-details.component';

const routes: Routes = [
  {
    path:'',
    component: MarketComponent
  },
  {
    path:':id',
    component: MarketDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
exports: [RouterModule]
})
export class MarketRoutingModule { }
