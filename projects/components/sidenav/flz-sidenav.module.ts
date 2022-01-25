import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { SidenavButtonComponent } from './sidenav-button/sidenav-button.component';
import { FlzSidenavComponent } from './flz-sidenav.component';

@NgModule({
  declarations: [FlzSidenavComponent, SidenavButtonComponent],
  imports: [CommonModule, MatIconModule, MatListModule, TranslateModule],
  exports: [FlzSidenavComponent],
})
export class FlzSidenavModule {}
