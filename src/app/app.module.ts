import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewComponent } from './new/new.component';
import { HistoryComponent } from './history/history.component';
import { ThreadComponent } from './thread/thread.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewComponent,
    HistoryComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
