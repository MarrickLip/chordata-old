import { Routes } from '@angular/router';

import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { SectionWrapperComponent } from './pages/project-details/section-wrapper/section-wrapper.component';

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
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'dashboard',
			},
			{
				path: ':section',
				component: SectionWrapperComponent,
			},
		],
	},
];
