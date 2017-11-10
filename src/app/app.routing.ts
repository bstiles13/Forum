import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { NewComponent } from './new/new.component';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'topic/:number?', component: HistoryComponent },    
    { path: 'new', component: NewComponent },
    { path: 'thread', component: ThreadComponent },
    { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);