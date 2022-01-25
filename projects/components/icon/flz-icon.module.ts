import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlzIconComponent } from './flz-icon.component';
import {
  FlzIconOptions,
  GLX_ICON_COMPONENT_OPTIONS,
  GLX_ICON_OPTIONS,
} from './types';

@NgModule({
  declarations: [FlzIconComponent],
  imports: [CommonModule],
  exports: [FlzIconComponent],
  providers: [
    {
      provide: GLX_ICON_COMPONENT_OPTIONS,
      useValue: {
        type: null,
        size: null,
      },
    },
  ],
})
export class FlzIconModule {
  static configure(
    options: Partial<FlzIconOptions>
  ): ModuleWithProviders<FlzIconModule> {
    return {
      ngModule: FlzIconModule,
      providers: [
        {
          provide: GLX_ICON_OPTIONS,
          useValue: Object.assign(
            {
              type: null,
              size: null,
            },
            options
          ),
        },
      ],
    };
  }
}
