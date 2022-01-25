import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FlzCoreComponent } from '@fokklzdev/components/core';
import {
  FlzIconOptions,
  FlzIconSize,
  FlzIconType,
  GLX_ICON_COMPONENT_OPTIONS,
  GLX_ICON_DEFAULT_OPTIONS,
  GLX_ICON_OPTIONS,
} from './types';

@Component({
  selector: 'flz-icon',
  templateUrl: './flz-icon.component.html',
  styleUrls: ['./flz-icon.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FlzIconComponent
  extends FlzCoreComponent
  implements AfterViewInit, OnChanges
{
  iconName!: string;
  iconType;
  iconSize;

  @Input() icon!: string;
  @Input() size!: FlzIconSize;
  @Input() type!: FlzIconType;
  @Input() options!: FlzIconOptions;

  @ViewChild('iconName')
  iconElem!: ElementRef;

  @HostBinding('class') override classes!: string;

  constructor(
    @Optional()
    @Inject(GLX_ICON_DEFAULT_OPTIONS)
    private providerOptions: FlzIconOptions,
    @Inject(GLX_ICON_COMPONENT_OPTIONS)
    private componentOptions: FlzIconOptions,
    @Optional()
    @Inject(GLX_ICON_OPTIONS)
    private iconOptions: FlzIconOptions
  ) {
    super('icon');
    let option = Object.assign(componentOptions, providerOptions, iconOptions);
    if (this.options !== undefined) {
      option = Object.assign(option, this.options);
    }
    this.iconSize = this._validate_icon_size(option.size);
    this.iconType = this._validate_icon_type(option.type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.iconName = this._parse_icon_name(changes['icon'].currentValue);
      this.updateIcon();
    }
    if (changes['size']) {
      this.iconSize = this._validate_icon_size(changes['size'].currentValue);
      this.updateIcon();
    }
    if (changes['type']) {
      this.iconType = this._validate_icon_type(changes['type'].currentValue);
      this.updateIcon();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Update Size
      if (this.size !== (undefined || null)) {
        this.iconSize = this._validate_icon_size(this.size);
      }

      // Update Type
      if (this.type !== (undefined || null)) {
        this.iconType = this._validate_icon_type(this.type);
      }

      // Update Name
      this.iconName = this._parse_icon_name(
        this.icon ?? (this.iconElem.nativeElement.innerText as string)
      );

      this.iconElem.nativeElement.remove();
      this.updateIcon();
    }, 1);
  }

  private updateIcon(): void {
    this.classes = this._(
      '',
      this.iconType,
      this.iconName,
      this.iconSize ?? 'no-size'
    );
  }

  private _validate_icon_size(size: FlzIconSize | null): string | null {
    if (size == null) {
      return null;
    }

    const allowedSizes = ['xs', 'sm', 'lg', '2x', '3x', '5x', '7x', '10x'];

    if (allowedSizes.includes(size)) {
      return `fa-${size}`;
    } else {
      console.warn(
        `Size ${size} not allowed for GalaxitIcons, Skipping (Size Only)...`
      );
      return null;
    }
  }

  private _validate_icon_type(type: FlzIconType | null): string {
    const allowedTypes = ['fas', 'far', 'fal', 'fad', 'fab'];

    if (allowedTypes.includes((type ?? 'fas').toString())) {
      return type ?? 'fas';
    } else {
      return 'fas'.toString();
    }
  }

  private _parse_icon_name(name: string): string {
    return `${name.startsWith('fa-') ? '' : 'fa-'}${name}`;
  }
}
