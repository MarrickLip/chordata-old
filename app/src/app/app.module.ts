import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { SidebarModule } from './pages/project-details/sidebar/sidebar.module';
import { NavbarModule} from './pages/project-details/navbar/navbar.module';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { AppRoutes } from './app.routing';
import { HomePageComponent } from './pages/home/home-page.component';
import { ProjectSummaryComponent } from './pages/home/project-summary/project-summary.component';
import { DashboardModule } from './pages/project-details/dashboard/dashboard.module';
import { SectionWrapperComponent } from './pages/project-details/section-wrapper/section-wrapper.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
            //useHash: true,
        }),
        NgbModule,
        HttpModule,
        SidebarModule,
        NavbarModule,
        DashboardModule,
    ],
    declarations: [
        AppComponent,
        ProjectDetailsComponent,
        HomePageComponent,
        ProjectSummaryComponent,
        SectionWrapperComponent,
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
