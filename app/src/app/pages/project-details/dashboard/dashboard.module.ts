import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

import {NavbarModule} from '../navbar/navbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NavbarModule
    ],
    declarations: [DashboardComponent],
    exports: [
        DashboardComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardModule {}
