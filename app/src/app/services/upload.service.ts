import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Device, devices } from '~model/devices/devices';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
    files: FileList = undefined

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
}
