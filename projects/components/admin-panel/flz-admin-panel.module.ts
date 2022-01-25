import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlzSidenavModule } from '@fokklzdev/components/sidenav';
import { FlzToolbarModule } from '@fokklzdev/components/toolbar';

import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FlzAdminPanelComponent } from './flz-admin-panel.component';

@NgModule({
  declarations: [FlzAdminPanelComponent],
  imports: [
    CommonModule,
    FlzSidenavModule,
    FlzToolbarModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [],
  exports: [FlzAdminPanelComponent, FlzToolbarModule, FlzSidenavModule],
})
export class FlzAdminPanelModule {}
