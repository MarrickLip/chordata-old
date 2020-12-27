import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Device } from '@chordata/model/devices/devices';
import { ProjectService } from 'app/services/project.service';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'app-step-device',
  templateUrl: './step-device.component.html',
  styleUrls: ['./step-device.component.css']
})
export class StepDeviceComponent implements OnInit {
  @ViewChild('upload', { static: true }) uploadEl: ElementRef;
  
  public devices: Device[] = [];
  public selectedDevice: Device;

  constructor(
    public project: ProjectService,
    public upload: UploadService
  ) { }

  ngOnInit(): void {
    this.upload.getDevices(this.project.id).then(
      devices => this.devices = devices
    );
  }

  selectDevice(device: Device) {
    this.selectedDevice = device;
    this.uploadEl.nativeElement.click();
  };

  async selectFiles(event: any) {
    if (this.upload.setFiles(this.selectedDevice, event.target.files)) {
      //
    } else {
      // 
    }
  }

}
