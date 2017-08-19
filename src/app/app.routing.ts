import { Routes, RouterModule } from "@angular/router";

import { HistoryComponent } from './history/history.component';
import { NewComponent } from './new/new.component';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes = [
    { path: '', component: HistoryComponent },
    { path: 'new', component: NewComponent },
    { path: 'thread/:number?', component: ThreadComponent },
    { path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);