import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Credentials } from '@aws-sdk/types';
import { v4 as uuid } from 'uuid';

import { Device, devices, WebkitFile } from '~model/devices/devices';
import { AwsCredentials } from '~app/credentials';
import { BLOB_BUCKET } from '~app/constants';
import { NgWizardService, StepChangedArgs } from 'ng-wizard';
import { UploadState } from './upload-state';
import { PostIngestRequestBody, PostIngestRequestHeaders } from '~model/api/PostIngestRequest';
import { APIService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	state: UploadState
	progress: number = undefined;

	constructor(public toastr: ToastrService, public wizard: NgWizardService, public api: APIService) {
		this.wizard.stepChanged().subscribe(this.handleWizardStepChange.bind(this));
		this.resetState();
	}

	async handleWizardStepChange(event: StepChangedArgs): Promise<void> {
		console.log({handleWizardStepChange: event.step.index});
		
		switch (event.step.index) {
			case 0:
				this.resetState();
			case 1:
				// add metadata
			case 2:
				this.createIngest();
		}
		
	}

	resetState(): void {
		this.state = {
			stage: 'SELECT_FILES',
			metadata: {
				location: {}
			}, // set this now to help with NgModel bindings
		};
	}

	async getDevices(projectId: string): Promise<Device[]> {
		this.state = {
			...this.state,
			projectId,
		}
		return devices;
	}

	setFiles(device: Device, files: FileList): boolean {
		for (const [test, errorMessage] of device.guards.errors) {
			console.log({ test, errorMessage, result: test(files) });
			if (!test(files)) {
				this.toastr.error(errorMessage, null, {
					positionClass: 'toast-top-center',
				});
				return false;
			}
		}

		for (const [test, warningMessage] of device.guards.warnings) {
			console.log({ test, warningMessage, result: test(files) });
			if (!test(files)) {
				this.toastr.warning(warningMessage, null, {
					positionClass: 'toast-top-center',
				});
			}
		}
		
		this.state = {
			...this.state,
			stage: 'ADD_METADATA',
			files: Array.from(files) as WebkitFile[],
			deviceId: device.id,
		};
		return true;
	}

	async upload(): Promise<void> {
		await this.createBlobs();
		await this.createIngest();
	}

	async createBlobs(): Promise<void> {
		this.state = {
			...this.state, 
			stage: 'CREATE_BLOBS',
			blobs: [],
		};

		this.progress = 0;

		const s3 = new S3Client({
			region: 'ap-southeast-2',
			credentials: AwsCredentials as Credentials
		});

		for (const file of this.state.files) {
			const guid = uuid();
			await s3.send(
				new PutObjectCommand({
					Bucket: BLOB_BUCKET,
					Key: guid,
					Body: file,
				})
			);
			this.state.blobs?.push({
				uri: `s3://${BLOB_BUCKET}/${guid}`,
			});

			this.progress += (1 / this.state.files?.length ?? 1);
		}
	}

	async createIngest(): Promise<void> {
		const body: PostIngestRequestBody = {
			metadata: this.state.metadata,
			blobs: this.state.blobs,
		};

		const headers: PostIngestRequestHeaders = {
			device: this.state.deviceId,
		};

		this.api.postIngest(this.state.projectId, body, headers);

	}
}
