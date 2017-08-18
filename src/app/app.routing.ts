import { Routes, RouterModule } from "@angular/router";

import { HistoryComponent } from './history/history.component';
import { NewComponent } from './new/new.component';
import { ThreadComponent } from './thread/thread.component';

const APP_ROUTES: Routes = [
    { path: '', component: HistoryComponent },
    { path: 'new', component: NewComponent },
    { path: 'thread/:number?', component: ThreadComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);