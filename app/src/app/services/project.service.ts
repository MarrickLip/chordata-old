import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	id: string = undefined;

	statistics = {
		detections: {
			count: 173,
			description: '+13 this week',
		},
		deployments: {
			count: 21,
			description: '+2 this week',
		},
		samples: {
			count: 454,
			description: '+97 this week',
		},
	}
}

