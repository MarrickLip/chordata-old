import { Component, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from './navbar/navbar.component';
import { Location, PopStateEvent} from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html'
})

export class ProjectDetailsComponent implements OnInit {
    private _router: Subscription;
    // url: string;
     url: string;
     location: Location;
     private lastPoppedUrl: string;
       private yScrollStack: number[] = [];
    @ViewChild('sidebar', {static: false}) sidebar;
    @ViewChild(NavbarComponent, {static: false}) navbar: NavbarComponent;
    constructor( private router: Router, location: Location ) {
      this.location = location;
    }

    ngOnInit() {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      this.location.subscribe((ev: PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event: any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl) {
                 this.yScrollStack.push(window.scrollY);
             }
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else {
                 window.scrollTo(0, 0);
             }
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });
      const html = document.getElementsByTagName('html')[0];
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          let ps = new PerfectScrollbar(elemMainPanel);
          ps = new PerfectScrollbar(elemSidebar);
          html.classList.add('perfect-scrollbar-on');
      } else {
          html.classList.add('perfect-scrollbar-off');
      }
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        this.navbar.sidebarClose();
      });
    }
    public isMap() {
        // console.log(this.location.prepareExternalUrl(this.location.path()));
        if (this.location.prepareExternalUrl(this.location.path()) == '#/maps/fullscreen') {
            return true;
        } else {
            return false;
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
