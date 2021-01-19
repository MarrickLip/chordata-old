import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UploadService } from '~app/services/upload.service';

import * as _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@Component({
	selector: 'app-step-metadata',
	templateUrl: './step-metadata.component.html',
	styleUrls: ['./step-metadata.component.css'],
})
export class StepMetadataComponent implements OnInit {
	@Input() showMetadataErrors: Observable<boolean>;
	_showMetadataErrors: boolean = false;
	coordinateLabels: { x: string; y: string };

	constructor(public upload: UploadService, public toastr: ToastrService) {
		this.upload.state.metadata.location = {}
	}

	ngOnInit(): void {
		this.showMetadataErrors.subscribe(
			value => this._showMetadataErrors = value
		)

		this.upload.state.metadata = {
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

	visibleFieldError(field: string): string | undefined {
		field = field ?? 'summary';
		if (this._showMetadataErrors) {
			const validationResult = this.upload.validateMetadata();
			if ('errors' in validationResult) {
				return validationResult.errors
					.find(error => error.field === field)
					?.message;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}

	parseMetadata(): void {
		if (this.upload.state.metadata) {
			this.upload.state.metadata.location = _.mapValues(
				// eslint-disable-next-line @typescript-eslint/ban-types
				this.upload.state.metadata.location as object,
				value => isNaN(Number(value)) ? value : Number(value),
			);
		}
	}

	selectCrs(crs: 'wgs84' | 'nztm'): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.upload.state.metadata.location as any).crs = crs;

		switch (crs) {
			case 'nztm':
				this.coordinateLabels = { x: 'x', y: 'y' };
				break;
			case 'wgs84':
				this.coordinateLabels = { x: 'lon', y: 'lat' };
				break;
		}
	}
}
