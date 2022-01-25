import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FlzCoreComponent } from '@fokklzdev/components/core';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TagComponent extends FlzCoreComponent implements OnChanges {
  @Input() size = '';
  @Input() content!: string;
  @Input() color = '';

  @HostBinding('class') class = this._('wrapper');

  @HostBinding('attr.color') attrColor = this.color;

  constructor() {
    super('tag');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      const value = changes['size'].currentValue;
      if (value) {
        this.class = this._('wrapper', value);
      }
    }

    if (changes['color']) {
      const value = changes['color'].currentValue;
      if (value) {
        this.attrColor = this.color;
      }
    }
  }
}
