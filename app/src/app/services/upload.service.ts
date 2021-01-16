import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Credentials } from '@aws-sdk/types';
import { v4 as uuid } from 'uuid';

import { Device, devices, WebkitFile } from '~model/devices/devices';
import { AwsCredentials } from '~app/credentials';
import { BLOB_BUCKET } from '~app/constants';
import { UploadState } from './upload-state';
import { PostDeploymentRequestBody, PostDeploymentRequestHeaders } from '~model/api/PostDeploymentRequest';
import { APIService } from './api.service';
import { ProjectService } from './project.service';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	state: UploadState
	progress: number = undefined;
	device?: Device = undefined;

	constructor(public toastr: ToastrService, public api: APIService, public project: ProjectService) {
		this.resetState();
	}

	resetState(): void {
		this.state = {
			stage: 'SELECT_FILES',
			projectId: this.project.id,
			metadata: {
				location: {}
			}, // set this now to help with NgModel bindings
		};
	}

	async getDevices(projectId: string): Promise<Device[]> {
		return devices;
	}

	setFiles(device: Device, files: FileList): boolean {
		this.device = device;

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
		await this.createDeployment();
	}

	async validateMetadata(): Promise<void> {

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

		console.log({blobs: this.state.files});

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

	async createDeployment(): Promise<void> {
		this.state = {
			...this.state,
			stage: 'CREATE_DEPLOYMENT',
		};
		
		const body: PostDeploymentRequestBody = {
			metadata: this.state.metadata,
			blobs: this.state.blobs,
		};

		const headers: PostDeploymentRequestHeaders = {
			device: this.state.deviceId,
		};

		await this.api.postDeployment(this.state.projectId, body, headers);

		// TODO: get deployment ID back
		this.state = {
			...this.state,
			stage: 'COMPLETE',
		};

	}
}
