import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor() { }

  async listProjects(): Promise<ProjectSummary[]> {
    return projects;
  }

}

export interface ProjectSummary {
  id: string,
  info: {
    name: string,
    description: string,
    image: string,
  }
}

const projects: ProjectSummary[] = [
  {
    id: 'auckland-islands',
    info: {
      name: 'Maungahuka / Auckland Islands (2020)',
      description: 'The Auckland Islands are an archipelago of New Zealand, lying 465 kilometres (290 mi) south of the South Island. The main Auckland Island occupies 510 km2 (200 sq mi)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Auckland_Islands_-_STS089-743-5.jpg/500px-Auckland_Islands_-_STS089-743-5.jpg',
    }
  },
  {
    id: 'eastern-forrest',
    info: {
      name: 'Eastern Forrest',
      description: 'Footage from the Eastern Forest trials',
      image: 'https://www.doc.govt.nz/globalassets/images/places/nelson-tasman/heaphy-track/heaphy-forest-1200.jpg',
    }
  }
];
