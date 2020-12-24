import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'app/services/project.service';
import { UploadDevice, UploadService } from 'app/services/upload.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-step-device',
  templateUrl: './step-device.component.html',
  styleUrls: ['./step-device.component.css']
})
export class StepDeviceComponent implements OnInit {
  public devices: UploadDevice[] = [];
  public selectedDevice: UploadDevice;

  constructor(
    public project: ProjectService,
    public upload: UploadService
  ) { }

  ngOnInit(): void {
    this.upload.getDevices(this.project.id).then(
      devices => this.devices = devices
    );
  }

  selectDevice(device: UploadDevice) {
    this.selectedDevice = device;
    document.getElementById('upload').click();
  };

  async selectFiles(event: any) {
    if (this.upload.setFiles(this.selectedDevice, event.target.files)) {
      alert('files were accepted!!')
    } else {
      alert('files were rejected :(');
    }
  }

}
