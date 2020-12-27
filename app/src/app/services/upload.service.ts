import { Injectable } from '@angular/core';

import { Device, devices } from '~model/devices/devices';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  files: FileList = undefined;

  constructor() { }

  setFiles(device: Device, files: FileList): boolean {
    this.files = files.length ? files : undefined;
    return !!this.files;
  }

  async getDevices(projectId: string): Promise<Device[]> {
    return devices;
  }

}
