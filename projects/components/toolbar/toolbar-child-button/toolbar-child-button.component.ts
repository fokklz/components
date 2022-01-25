import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FlzToolbarRouteLabel } from '../types';

@Component({
  selector: 'flz-toolbar-child-button',
  templateUrl: './toolbar-child-button.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarChildButtonComponent
  extends FlzCoreComponent
  implements AfterViewInit, OnDestroy
{
  stop$: Subject<void> = new Subject();
  @HostBinding('class') override classes = this._('wrapper');

  // track state
  @HostBinding('class.hovered') hovered = false;

  // track button
  @HostBinding('class.active') active = false;

  @Input() config!: FlzToolbarRouteLabel;

  routerPath: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hovered = false;
  }

  constructor(private router: Router) {
    super('toolbar-button-list');
    this.routerPath.next(router.url);
    this.router.events.pipe(takeUntil(this.stop$)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.routerPath.next(e.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.routerPath.pipe(takeUntil(this.stop$)).subscribe((path) => {
        const targetLink = this.config.link.replace(/[^A-Za-z0-9-]/g, '');
        path = path.replace(/[^A-Za-z0-9-]/g, '');
        if (path === targetLink) {
          this.active = true;
        } else {
          this.active = false;
        }
      });
    }, 1);
  }

  _lang_default(): string {
    return `{Default: "${this.config.labelDefault ?? this.config.label}"}`;
  }

  _lang_key(): string {
    return this.config.langKey ?? 'TERM.' + this.config.label.toUpperCase();
  }

  ngOnDestroy(): void {
    this.stop$.next();
  }
}
