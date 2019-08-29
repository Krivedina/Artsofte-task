import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransactionComponent} from './layout/transaction/transaction.component';
import {HistoryComponent} from './layout/history/history.component';


const routes: Routes = [
  {path: '', redirectTo: 'transaction', pathMatch: 'full'},
  {path: 'transaction', component: TransactionComponent},
  {path: 'transaction/:id', component: TransactionComponent},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
