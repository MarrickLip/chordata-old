import { Component, Input, OnInit } from '@angular/core';
import { ListProjectsResponseItem } from '~model/api/ListProjectsResponse';

@Component({
	selector: 'app-project-summary',
	templateUrl: './project-summary.component.html',
	styleUrls: ['./project-summary.component.css'],
})
export class ProjectSummaryComponent {
    @Input() project: ListProjectsResponseItem

    constructor() {}
}
