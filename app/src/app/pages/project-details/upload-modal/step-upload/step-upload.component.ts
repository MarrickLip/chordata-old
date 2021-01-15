import { Component } from '@angular/core';
import { UploadService } from '~app/services/upload.service';

@Component({
	selector: 'app-step-upload',
	templateUrl: './step-upload.component.html',
	styleUrls: ['./step-upload.component.css']
})
export class StepUploadComponent {
	constructor(public upload: UploadService) { }
}
