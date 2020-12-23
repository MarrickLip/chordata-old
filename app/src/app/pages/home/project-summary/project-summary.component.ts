import {Component, Input, OnInit} from '@angular/core';
// import {ProjectSummary} from '../../../services/api.service';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {
  // @Input() project: ProjectSummary;

  constructor() { }

  ngOnInit(): void {
    // console.log({project: this.project})
  }

}
