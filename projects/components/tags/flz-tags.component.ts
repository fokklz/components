import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { FlzTagsSize } from './types';

@Component({
  selector: 'flz-tags',
  templateUrl: './flz-tags.component.html',
  styleUrls: ['./flz-tags.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FlzTagsComponent
  extends FlzCoreComponent
  implements OnInit, OnChanges
{
  @HostBinding('class') class = this._('wrapper');

  @Input() tags!: string[] | number[] | string;
  @Input() size: FlzTagsSize = 'medium';
  @Input() color = '';

  printTags: string[] = [];
  tagSize!: string;

  constructor() {
    super('tags');
  }

  ngOnInit(): void {
    this.updateSize(this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tags']) {
      const value = changes['tags'].currentValue;
      if (value) {
        this.updateTags(value);
      }
    }

    if (changes['size']) {
      const value = changes['size'].currentValue;
      if (value) {
        this.updateSize(value);
      }
    }
  }

  updateTags(tags?: string[] | number[] | string): void {
    function convert(tagsToConvert: string[] | number[] | string): string[] {
      if (typeof tagsToConvert === 'string') {
        return tagsToConvert.split(',');
      } else {
        return (tagsToConvert as any[]).map((v: string | number) => {
          return v.toString();
        });
      }
    }

    this.printTags = convert(tags ?? this.tags);
  }

  updateSize(size?: string): void {
    size = size ?? this.size;

    function convert(type: string): string {
      switch (type) {
        case 'small':
        case 'sm':
          return 'small';
        case 'medium':
        case 'md':
        default:
          return 'medium';
        case 'large':
        case 'lg':
          return 'large';
      }
    }

    this.tagSize = convert(size);
  }
}
