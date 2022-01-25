import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/**
 * GLX imports
 */

import { FlzInlineMessageModule } from '@fokklzdev/components/inline-message';
import { FlzIconModule } from '@fokklzdev/components/icon';
import { FlzInputComponent } from './flz-input/flz-input.component';
import { FlzFormBuilderComponent } from './flz-form-builder.component';

/**
 * MAT imports
 */

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [FlzFormBuilderComponent, FlzInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    FlzIconModule,
    FlzInlineMessageModule,
    TranslateModule,
  ],
  exports: [FormsModule, ReactiveFormsModule, FlzFormBuilderComponent],
  providers: [MatDatepickerModule],
})
export class FlzFormBuilderModule {}
