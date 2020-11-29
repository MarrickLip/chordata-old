import { Component} from '@angular/core';
import 'rxjs/add/operator/filter';

export interface Section {
    id: string,
    name: string,
    icon: string,
}

export const sections: Section[] = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'tachometer-alt',
    },
    {
        id: 'samples',
        name: 'Samples',
        icon: 'table',
    }
]

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent {
    sections = sections;
}
