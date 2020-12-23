import { Component, OnInit } from '@angular/core';
import {APIService} from '../../services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
      private API: APIService
  ) { }

  ngOnInit(): void {
    this.API.listProjects().then(
        projects => console.log({projects})
    );
  }

}
