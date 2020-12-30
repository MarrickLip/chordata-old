import { STEP_STATE } from 'ng-wizard'
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'

declare var $: any;

@Component({
    selector: 'app-upload-modal',
    templateUrl: './upload-modal.component.html',
    styleUrls: ['./upload-modal.component.css'],
})
export class UploadModalComponent implements AfterViewInit {
    @ViewChild('wizard') wizard: ElementRef;
    
    stepStates = {
        normal: STEP_STATE.normal,
        disabled: STEP_STATE.disabled,
        error: STEP_STATE.error,
        hidden: STEP_STATE.hidden,
    }

    constructor() {}
    

    ngAfterViewInit(): void {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        this.setupStepIcons()
    }

    setupStepIcons() {
        const wizardEl = this.wizard.nativeElement as HTMLDivElement;
        const steps: HTMLElement[] = Array.from(wizardEl.getElementsByTagName('li'));
        for (let stepEl of steps) {
            const linkEl = stepEl.getElementsByClassName('nav-link')[0] as HTMLElement;
            const title = linkEl.innerText;
            
            const icon = {
                '① Connect Device': 'fas fa-microchip',
                '② Metadata': 'fas fa-list-ul',
                '③ Upload': 'fas fa-upload'
            }[title] || 'fas fa-bug';
            
            // inject the fontawesome icon
            linkEl.innerText = null;
            linkEl.classList.add('step-icon-container');
            linkEl.insertAdjacentHTML('afterbegin', `<i class="${icon} step-icon"></i>`)
            
            // add a tooltip
            linkEl.setAttribute('title', title);
            linkEl.setAttribute('data-toggle', 'tooltip');
            linkEl.setAttribute('data-placement', 'bottom');
        }
    }

}
