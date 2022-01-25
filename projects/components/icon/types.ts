import { InjectionToken } from '@angular/core';

/**
 * ANGULAR INJECTION TOKENS
 */

export const GLX_ICON_DEFAULT_OPTIONS = new InjectionToken<FlzIconOptions>(
  'FlzIconOptionsD'
);
export const GLX_ICON_COMPONENT_OPTIONS = new InjectionToken<FlzIconOptions>(
  'FlzIconComponentOptions'
);
export const GLX_ICON_OPTIONS = new InjectionToken<FlzIconOptions>(
  'FlzIconOptions'
);

/**
 * FONT AWESOME TYPES
 */

export type FlzIconSize =
  | 'xs'
  | 'sm'
  | 'lg'
  | '2x'
  | '3x'
  | '5x'
  | '7x'
  | '10x';

export type FlzIconType = 'fas' | 'far' | 'fal' | 'fad' | 'fab';

/**
 * GLX ICON OPTIONS
 */

export interface FlzIconOptions {
  type: FlzIconType | null;
  size: FlzIconSize | null;
}
