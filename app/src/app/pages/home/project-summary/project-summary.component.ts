import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '~app/services/project.service';
import { ListProjectsResponseItem } from '~model/api/ListProjectsResponse';

@Component({
	selector: 'app-project-summary',
	templateUrl: './project-summary.component.html',
	styleUrls: ['./project-summary.component.css'],
})
export class ProjectSummaryComponent {
	@Input() project: ListProjectsResponseItem;

	constructor(public projectService: ProjectService, private router: Router) { }

	selectProject(): void {
		this.projectService.id = this.project._id;
		this.router.navigate(['projects', this.projectService.id]);
		console.log({selectedProject: this.projectService.id});
	}
}
