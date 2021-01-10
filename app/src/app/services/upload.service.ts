import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Credentials } from '@aws-sdk/types';
import { v4 as uuid } from 'uuid';

import { Device, devices } from '~model/devices/devices';
import { AwsCredentials } from '~app/credentials';
import { BLOB_BUCKET } from '~app/constants';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	files: FileList = undefined;
	metadata: Record<string, unknown> = {};

	constructor(public toastr: ToastrService) {}

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

		return true;
	}

	async getDevices(projectId: string): Promise<Device[]> {
		return devices;
	}

	async createIngest(): Promise<void> {
		const s3 = new S3Client({
			region: 'ap-southeast-2',
			credentials: AwsCredentials as Credentials
		});
		
		for (const file of Array.from(this.files)) {
			await s3.send(
				new PutObjectCommand({
					Bucket: BLOB_BUCKET,
					Key: uuid(),
					Body: file,
				})
			);
		}
	}
}
