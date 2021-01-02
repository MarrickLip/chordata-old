import { Component, Input } from '@angular/core';
import { Section } from '../project-details.component';

@Component({
	moduleId: module.id,
	selector: 'app-project-details-sidebar',
	templateUrl: 'sidebar.component.html',
	styleUrls: ['sidebar.component.css'],
})
export class SidebarComponent {
	@Input() sections: Section[];
}
