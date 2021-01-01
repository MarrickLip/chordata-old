import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '~app/services/upload.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@Component({
	selector: 'app-step-metadata',
	templateUrl: './step-metadata.component.html',
	styleUrls: ['./step-metadata.component.css'],
})
export class StepMetadataComponent implements OnInit {
	coordinateLabels: {x: string, y: string};	

	constructor(public upload: UploadService, public toastr: ToastrService) {}

	ngOnInit(): void {
		this.upload.metadata = {
			location: {},
			tags: ['Bats'],
		};

		this.selectCrs('nztm');

		// init tag input
		const tagClass = $('.tagsinput').data('color');
		if ($('.tagsinput').length != 0) {
			$('.tagsinput').tagsinput();
		}
		$('.bootstrap-tagsinput').addClass('' + tagClass + '-badge');

		$('.selectpicker').selectpicker({
			iconBase: 'nc-icon',
			tickIcon: 'nc-check-2',
		});
	}

	selectCrs(crs: 'wgs84' | 'nztm'): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.upload.metadata.location as any).crs = crs;

		switch (crs) {
		case 'nztm':
			this.coordinateLabels = {x: 'x', y: 'y'};
			break;
		case 'wgs84':
			this.coordinateLabels = {x: 'lon', y: 'lat'};
			break;
		}

	}
}
