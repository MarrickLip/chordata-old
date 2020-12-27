import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { StepDeviceComponent } from './step-device.component'

describe('StepDeviceComponent', () => {
    let component: StepDeviceComponent
    let fixture: ComponentFixture<StepDeviceComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StepDeviceComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(StepDeviceComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
