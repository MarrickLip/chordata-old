import { Routes } from '@angular/router';

import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import {HomePageComponent} from './pages/home/home-page.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
    },
    {
        path: 'projects',
        component: HomePageComponent,
    },
    {
        path: 'projects/:id',
        component: ProjectDetailsComponent,
    }
];
