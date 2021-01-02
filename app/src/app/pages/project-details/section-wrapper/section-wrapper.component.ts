import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-section-wrapper',
	templateUrl: './section-wrapper.component.html',
	styleUrls: ['./section-wrapper.component.css'],
})
export class SectionWrapperComponent implements OnInit {
	sectionId: string;
	showUploadModal: boolean;

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe(
			(params) => (this.sectionId = params.get('section'))
		);

		this.route.fragment.subscribe(
			(fragment) => (this.showUploadModal = fragment === 'upload')
		);
	}
}
