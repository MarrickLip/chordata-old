import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'app/services/project.service';
import { UploadDevice, UploadService } from 'app/services/upload.service';

@Component({
  selector: 'app-step-device',
  templateUrl: './step-device.component.html',
  styleUrls: ['./step-device.component.css']
})
export class StepDeviceComponent implements OnInit {
  public devices: UploadDevice[] = [];

  constructor(
    public project: ProjectService,
    public upload: UploadService
  ) { }

  ngOnInit(): void {
    this.upload.getDevices(this.project.id).then(
      devices => this.devices = devices
    );
  }

  async selectDevice(device: UploadDevice) {
    document.getElementById('upload').click()
  }

}
