import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

  constructor(public project: ProjectService, public router: Router) { }

  canActivate(): boolean {
    if (this.project.id) {
      return true;
    } else {
      this.router.navigate(['projects']);
      return false;
    }
  }
  
}
