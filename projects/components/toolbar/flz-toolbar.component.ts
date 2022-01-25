import {
  AfterViewInit,
  Component,
  Host,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

import { FlzCoreComponent } from '@fokklzdev/components/core';
import { FlzToolbarRoute } from '.';

@Component({
  selector: 'flz-toolbar',
  templateUrl: './flz-toolbar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FlzToolbarComponent extends FlzCoreComponent {
  @HostBinding('class') override classes = this._('wrapper');

  @Input() routes!: Array<FlzToolbarRoute>;

  @ViewChild(MatToolbar) toolbar!: MatToolbar;

  constructor() {
    super('toolbar');
  }
}
