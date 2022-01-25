import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { ToolbarChildButtonComponent } from './toolbar-child-button/toolbar-child-button.component';
import { FlzToolbarComponent } from './flz-toolbar.component';

@NgModule({
  declarations: [
    FlzToolbarComponent,
    ToolbarButtonComponent,
    ToolbarChildButtonComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
  ],
  exports: [FlzToolbarComponent],
})
export class FlzToolbarModule {}
