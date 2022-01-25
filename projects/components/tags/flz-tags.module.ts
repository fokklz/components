import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlzTagsComponent } from './flz-tags.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [FlzTagsComponent, TagComponent],
  imports: [CommonModule],
  exports: [FlzTagsComponent],
})
export class FlzTagsModule {}
