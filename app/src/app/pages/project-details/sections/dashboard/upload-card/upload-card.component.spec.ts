import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadCardComponent } from './upload-card.component';

describe('UploadCardComponent', () => {
	let component: UploadCardComponent;
	let fixture: ComponentFixture<UploadCardComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [UploadCardComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UploadCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
