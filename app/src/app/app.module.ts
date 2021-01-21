import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardModule, THEME } from 'ng-wizard';

import { AppComponent } from './app.component';

import { SidebarModule } from './pages/project-details/sidebar/sidebar.module';
import { NavbarModule } from './pages/project-details/navbar/navbar.module';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { AppRoutes } from './app.routing';
import { HomePageComponent } from './pages/home/home-page.component';
import { ProjectSummaryComponent } from './pages/home/project-summary/project-summary.component';
import { SectionWrapperComponent } from './pages/project-details/section-wrapper/section-wrapper.component';
import { UploadModalComponent } from './pages/project-details/upload-modal/upload-modal.component';
import { CardButtonComponent } from './components/card-button/card-button.component';
import { StepDeviceComponent } from './pages/project-details/upload-modal/step-device/step-device.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StepUploadComponent } from '~app/pages/project-details/upload-modal/step-upload/step-upload.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { StatsCardComponent } from '~app/components/stats-card/stats-card.component';

import { ToastrModule } from 'ngx-toastr';
import { StepMetadataComponent } from './pages/project-details/upload-modal/step-metadata/step-metadata.component';
import { TagInputModule } from 'ngx-chips';
import { DashboardComponent } from '~app/pages/project-details/sections/dashboard/dashboard.component';
import { UploadCardComponent } from './pages/project-details/sections/dashboard/upload-card/upload-card.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DetectionsMapComponent } from './components/detections-map/detections-map.component';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		RouterModule.forRoot(AppRoutes, {
			relativeLinkResolution: 'legacy'
		}),
		NgbModule,
		HttpClientModule,
		SidebarModule,
		NavbarModule,
		NgWizardModule.forRoot({ theme: THEME.circles }),
		ToastrModule.forRoot(),
		TagInputModule,
		ProgressBarModule,
		NgxMapboxGLModule.withConfig({
			accessToken: 'pk.eyJ1IjoibWFycmlja2xpcCIsImEiOiJja2s2OGNkdTkwMWlrMzBueWRpOWpsaGd5In0.Z8M6Mu2uojeL15TLbQ5uJQ',
		})
	],
	declarations: [
		AppComponent,
		ProjectDetailsComponent,
		HomePageComponent,
		ProjectSummaryComponent,
		SectionWrapperComponent,
		UploadModalComponent,
		CardButtonComponent,
		StepDeviceComponent,
		StepMetadataComponent,
		StepUploadComponent,
		StatsCardComponent,
		DashboardComponent,
		UploadCardComponent,
		DetectionsMapComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
