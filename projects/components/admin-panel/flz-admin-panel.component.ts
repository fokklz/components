import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { FlzSidenavRoutes } from '@fokklzdev/components/sidenav';
import { FlzToolbarRoutes } from '@fokklzdev/components/toolbar';

@Component({
  selector: 'flz-admin-panel',
  templateUrl: './flz-admin-panel.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FlzAdminPanelComponent extends FlzCoreComponent {
  @Input() sidenav!: FlzSidenavRoutes;
  @Input() toolbar!: FlzToolbarRoutes;
  @Input() basePath!: string;

  @HostBinding('class') override classes = this._('wrapper');

  constructor() {
    super('admin-panel');
  }
}
