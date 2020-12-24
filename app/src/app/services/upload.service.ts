import { Injectable } from '@angular/core';

export type UploadDevice = {
  id: string,
  name: string,
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileList: FileList = undefined;

  constructor() { }

  setFiles(device: UploadDevice, fileList: FileList): boolean {
    this.fileList = fileList.length ? fileList : undefined;
    return !!this.fileList;
  }

  async getDevices(projectId: string): Promise<UploadDevice[]> {
    return [
      {
        id: 'audio-moth',
        name: 'Audio Moth',
        icon: 'fas fa-microphone',
      }
      // }, {
      //   id: 'audio-moth',
      //   name: 'Audio Moth',
      //   icon: 'fas fa-microphone',
      // }
    ]
  }

}
