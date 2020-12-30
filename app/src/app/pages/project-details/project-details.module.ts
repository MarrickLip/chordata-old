import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './sections/dashboard/dashboard.component';

import { NavbarModule } from './navbar/navbar.module';
import { UploadCardComponent } from './sections/dashboard/upload-card/upload-card.component';
import { RouterModule } from '@angular/router';
import { StepMetadataComponent } from './upload-modal/step-metadata/step-metadata.component';

@NgModule({
	imports: [CommonModule, FormsModule, NavbarModule, RouterModule],
	declarations: [DashboardComponent, UploadCardComponent],
	exports: [DashboardComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectDetailsModule {}
