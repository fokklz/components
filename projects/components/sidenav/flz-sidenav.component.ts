import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { FlzSidenavRoute } from './types';

@Component({
  selector: 'flz-sidenav',
  templateUrl: './flz-sidenav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FlzSidenavComponent extends FlzCoreComponent {
  @Input() routes!: Array<FlzSidenavRoute>;
  @Input() basePath!: string;

  @HostBinding('class') override classes = this._('wrapper');

  constructor() {
    super('sidenav');
  }
}
