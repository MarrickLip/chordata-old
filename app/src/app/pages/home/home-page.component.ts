import { Component, OnInit } from '@angular/core';
import { ListProjectsResponse } from '~model/api/ListProjectsResponse';
import {APIService} from '../../services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  projects: ListProjectsResponse;

  constructor(
      private API: APIService
  ) { }

  ngOnInit(): void {
    this.API.listProjects().then(
        projects => this.projects = projects
    );
  }

}
