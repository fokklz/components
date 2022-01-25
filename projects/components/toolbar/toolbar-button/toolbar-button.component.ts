import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FlzToolbarRoute, FlzToolbarRouteLabel } from '../types';

@Component({
  selector: 'flz-toolbar-button',
  templateUrl: './toolbar-button.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarButtonComponent
  extends FlzCoreComponent
  implements AfterViewInit, OnDestroy
{
  stop$: Subject<void> = new Subject();
  @HostBinding('class') override classes!: string[];

  // track state
  @HostBinding('class.hovered') hovered = false;

  // track button
  @HostBinding('class.has-childs') hasChilds = false;
  @HostBinding('class.active') active = false;

  @Input() config!: FlzToolbarRoute;

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
    super('toolbar-button');
    this.routerPath.next(router.url);
    this.router.events.pipe(takeUntil(this.stop$)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.routerPath.next(e.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._update_classes();

      this.hasChilds = (this.config.children ?? []).length > 0;

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

  protected _update_classes(): void {
    this.classes = [
      `${this.baseClass}-wrapper`,
      `${this._is_icon_only() ? 'icon-only' : ''}`,
    ];
  }

  _lang_default(): string {
    if (!this._is_icon_only()) {
      const config = this.config as FlzToolbarRouteLabel;
      return `{Default: "${config.labelDefault ?? config.label}"}`;
    } else {
      return '';
    }
  }

  _lang_key(): string {
    if (!this._is_icon_only()) {
      const config = this.config as FlzToolbarRouteLabel;
      return config.langKey ?? `TERM.${config.label.toUpperCase()}`;
    } else {
      return '';
    }
  }

  _is_icon_only(): boolean {
    return !this.config.hasOwnProperty('label');
  }

  ngOnDestroy(): void {
    this.stop$.next();
  }
}
