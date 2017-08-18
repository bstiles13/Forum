import { Routes, RouterModule } from "@angular/router";

import { HistoryComponent } from './history/history.component';
import { NewComponent } from './new/new.component';

const APP_ROUTES: Routes = [
    { path: '', component: HistoryComponent },
    { path: 'new', component: NewComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);