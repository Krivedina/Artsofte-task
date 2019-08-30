import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';

import {AppComponent} from './app.component';
import {TransactionComponent} from './layout/transaction/transaction.component';
import {LayoutComponent} from './layout/layout.component';
import {HistoryComponent} from './layout/history/history.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    LayoutComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
