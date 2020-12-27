import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Device, devices } from '~model/devices/devices';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  files: FileList = undefined;

  constructor(
    public toastr: ToastrService,
  ) { }

  setFiles(device: Device, files: FileList): boolean {
    for (let [test, errorMessage] of device.guards.errors) {
      if (!test(files)) {
        this.toastr.error(errorMessage);
      }
    }
    

    return true;
  }

  async getDevices(projectId: string): Promise<Device[]> {
    return devices;
  }

}
