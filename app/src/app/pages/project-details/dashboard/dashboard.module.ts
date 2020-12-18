import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

import {NavbarModule} from '../navbar/navbar.module';
import { UploadCardComponent } from './upload-card/upload-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NavbarModule,
        RouterModule,
    ],
    declarations: [DashboardComponent, UploadCardComponent],
    exports: [
        DashboardComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardModule {}
