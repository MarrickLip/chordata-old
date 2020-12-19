import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardModule, THEME } from 'ng-wizard';

import { AppComponent } from './app.component';

import { SidebarModule } from './pages/project-details/sidebar/sidebar.module';
import { NavbarModule} from './pages/project-details/navbar/navbar.module';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { AppRoutes } from './app.routing';
import { HomePageComponent } from './pages/home/home-page.component';
import { ProjectSummaryComponent } from './pages/home/project-summary/project-summary.component';
import { DashboardModule } from './pages/project-details/dashboard/dashboard.module';
import { SectionWrapperComponent } from './pages/project-details/section-wrapper/section-wrapper.component';
import { UploadModalComponent } from './pages/project-details/upload-modal/upload-modal.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
            //useHash: true,
            // enableTracing: true,
        }),
        NgbModule,
        HttpModule,
        SidebarModule,
        NavbarModule,
        DashboardModule,
        NgWizardModule.forRoot({theme: THEME.circles})
    ],
    declarations: [
        AppComponent,
        ProjectDetailsComponent,
        HomePageComponent,
        ProjectSummaryComponent,
        SectionWrapperComponent,
        UploadModalComponent,
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
