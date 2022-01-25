import { Component, HostBinding, Input } from '@angular/core';
import { FlzCoreComponent } from '@fokklzdev/components/core';

@Component({
  selector: 'flz-inline-message',
  templateUrl: './inline-message.component.html',
})
export class FlzInlineMessageComponent extends FlzCoreComponent {
  @HostBinding('class') class = this._('wrapper');

  @Input() enabled!: string | undefined;
  @Input() type: 'success' | 'warn' | 'error' | 'none' = 'none';
  @Input() content!: string;

  constructor() {
    super('inline-message');
  }

  isEnabled(): boolean {
    return this.enabled !== undefined;
  }

  setSuccess(content?: string): void {
    this.type = 'success';
    if (content && content.length > 0) {
      this.content = content;
    }
  }

  setError(content?: string): void {
    this.type = 'error';
    if (content && content.length > 0) {
      this.content = content;
    }
  }

  setWarn(content?: string): void {
    this.type = 'warn';
    if (content && content.length > 0) {
      this.content = content;
    }
  }

  enable(): void {
    this.enabled = '';
  }

  disable(): void {
    this.enabled = undefined;
  }
}
