import { NgWizardService, StepChangedArgs, StepValidationArgs, STEP_DIRECTIN } from 'ng-wizard';
import { AfterViewInit, OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UploadService } from '~app/services/upload.service';
import { ToastrService } from 'ngx-toastr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@Component({
	selector: 'app-upload-modal',
	templateUrl: './upload-modal.component.html',
	styleUrls: ['./upload-modal.component.css'],
})
export class UploadModalComponent implements OnInit, AfterViewInit {
	@ViewChild('wizard') wizardEl: ElementRef;



	constructor(public wizard: NgWizardService, public upload: UploadService, public toastr: ToastrService) { }

	ngOnInit(): void {
		this.wizard.stepChanged().subscribe(this.handleWizardStepChange.bind(this));
	}

	ngAfterViewInit(): void {
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
		this.setupStepIcons();
	}

	validateLeaveStep = (args: StepValidationArgs): boolean => {
		console.log({validateLeaveStep: args.direction});
		if (args.direction === STEP_DIRECTIN.forward) {
			switch(args.fromStep.index) {
				case 0:
					if (this.upload.state.files) {
						return true;
					} else {
						this.toastr.error('No files selected!');
						return false;
					}
				case 1:
					console.log(this.upload.state.metadata);
					return false;
				case 2:
					return true;
			}
		} else {
			return true;
		}
	}

	async handleWizardStepChange(event: StepChangedArgs): Promise<void> {
		if (event.step.index === 2) {
			this.upload.upload();
		}
	}

	setupStepIcons(): void {
		const wizardEl = this.wizardEl.nativeElement as HTMLDivElement;
		const steps: HTMLElement[] = Array.from(
			wizardEl.getElementsByTagName('li')
		);
		for (const stepEl of steps) {
			const linkEl = stepEl.getElementsByClassName(
				'nav-link'
			)[0] as HTMLElement;
			const title = linkEl.innerText;

			const icon =
				{
					'① Connect Device': 'fas fa-microchip',
					'② Metadata': 'fas fa-list-ul',
					'③ Upload': 'fas fa-upload',
				}[title.trim()] || 'fas fa-bug';

			console.log({title, icon});

			// inject the fontawesome icon
			linkEl.innerText = null;
			linkEl.classList.add('step-icon-container');
			linkEl.insertAdjacentHTML(
				'afterbegin',
				`<i class="${icon} step-icon"></i>`
			);

			// add a tooltip
			linkEl.setAttribute('title', title);
			linkEl.setAttribute('data-toggle', 'tooltip');
			linkEl.setAttribute('data-placement', 'bottom');
		}
	}
}
