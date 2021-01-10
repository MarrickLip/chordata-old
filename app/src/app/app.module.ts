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
import { ProjectDetailsModule } from './pages/project-details/project-details.module';
import { SectionWrapperComponent } from './pages/project-details/section-wrapper/section-wrapper.component';
import { UploadModalComponent } from './pages/project-details/upload-modal/upload-modal.component';
import { CardButtonComponent } from './components/card-button/card-button.component';
import { StepDeviceComponent } from './pages/project-details/upload-modal/step-device/step-device.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { StepMetadataComponent } from './pages/project-details/upload-modal/step-metadata/step-metadata.component';
import { TagInputModule } from 'ngx-chips';

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
		ProjectDetailsModule,
		NgWizardModule.forRoot({ theme: THEME.circles }),
		ToastrModule.forRoot(),
		TagInputModule,
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
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
