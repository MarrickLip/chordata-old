import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
} from '@angular/core';

import {
	Location,
} from '@angular/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const document: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

const misc = {
	navbar_menu_visible: 0,
	active_collapse: true,
	disabled_collapse_init: 0,
	sidebar_mini_active: undefined,
};

@Component({
	moduleId: module.id,
	selector: 'app-project-details-navbar',
	templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
    location: Location
    private toggleButton
    private sidebarVisible: boolean
    public open = false

    @ViewChild('navbar-cmp', { static: false }) button

    constructor(
    	location: Location,
        private element: ElementRef    ) {
    	this.location = location;
    	this.sidebarVisible = false;
    }

    ngOnInit(): void {
    	const navbar: HTMLElement = this.element.nativeElement;
    	const body = document.getElementsByTagName('body')[0];
    	this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    	if (body.classList.contains('sidebar-mini')) {
    		misc.sidebar_mini_active = true;
    	}
    }

    minimizeSidebar(): void {
    	const body = document.getElementsByTagName('body')[0];

    	if (misc.sidebar_mini_active === true) {
    		body.classList.remove('sidebar-mini');
    		misc.sidebar_mini_active = false;
    	} else {
    		setTimeout(function () {
    			body.classList.add('sidebar-mini');

    			misc.sidebar_mini_active = true;
    		}, 300);
    	}

    	// we simulate the window Resize so the charts will get updated in realtime.
    	const simulateWindowResize = setInterval(function () {
    		window.dispatchEvent(new Event('resize'));
    	}, 180);

    	// we stop the simulation of Window Resize after the animations are completed
    	setTimeout(function () {
    		clearInterval(simulateWindowResize);
    	}, 1000);
    }

    isMobileMenu(): boolean {
    	if (window.outerWidth < 991) {
    		return false;
    	}
    	return true;
    }

    sidebarOpen(): boolean {
    	const toggleButton = this.toggleButton;
    	const html = document.getElementsByTagName('html')[0];
    	setTimeout(function () {
    		toggleButton.classList.add('toggled');
    	}, 500);
    	const mainPanel = <HTMLElement>(
            document.getElementsByClassName('main-panel')[0]
        );
    	if (window.innerWidth < 991) {
    		mainPanel.style.position = 'fixed';
    	}
    	html.classList.add('nav-open');
    	this.sidebarVisible = true;
    }
    sidebarClose(): void {
    	const html = document.getElementsByTagName('html')[0];
    	this.toggleButton.classList.remove('toggled');
    	this.sidebarVisible = false;
    	html.classList.remove('nav-open');
    	const mainPanel = <HTMLElement>(
            document.getElementsByClassName('main-panel')[0]
        );

    	if (window.innerWidth < 991) {
    		setTimeout(function () {
    			mainPanel.style.position = '';
    		}, 500);
    	}
    }
    sidebarToggle(): void {
    	// var toggleButton = this.toggleButton;
    	// var body = document.getElementsByTagName('body')[0];
    	if (this.sidebarVisible == false) {
    		this.sidebarOpen();
    	} else {
    		this.sidebarClose();
    	}
    }

    getPath(): string {
    	// console.log(this.location);
    	return this.location.prepareExternalUrl(this.location.path());
    }
}
