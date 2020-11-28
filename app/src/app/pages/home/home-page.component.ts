import { Component, OnInit } from '@angular/core';
import {APIService, ProjectSummary} from '../../services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  projects: ProjectSummary[] = undefined;
  private JSON: JSON;

  constructor(
      private API: APIService
  ) {
    this.JSON = JSON;
  }

  ngOnInit(): void {
    this.API.listProjects().then(
        projects => this.projects = projects
    );
  }

}
