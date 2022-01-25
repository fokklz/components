import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FlzCoreComponent } from '@fokklzdev/components/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FlzSidenavRoute } from '../types';

@Component({
  selector: 'flz-sidenav-button',
  templateUrl: './sidenav-button.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SidenavButtonComponent
  extends FlzCoreComponent
  implements AfterViewInit, OnDestroy
{
  stop$: Subject<void> = new Subject();

  @HostBinding('class') override classes!: string;

  // track hover state
  @HostBinding('class.is-hovered') isHovered = false;
  @HostBinding('class.hovered') hovered = false;

  // track button
  @HostBinding('class.has-childs') hasChilds = false;
  @HostBinding('class.active') active = false;
  @HostBinding('class.is-child') isChild = false;

  @Input() config!: FlzSidenavRoute;
  @Input() basePath!: string;
  // temporary fix
  @Input() ignoreChild!: boolean;

  @Output() flzActive: EventEmitter<void> = new EventEmitter<void>();

  routerPath: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
    setTimeout(() => {
      if (this.isHovered) {
        this.hovered = true;
      }
    }, 300);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
    this.hovered = false;
  }

  constructor(private router: Router) {
    super('sidenav-button');
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
      this.isChild = this._is_child();
      this.hasChilds = (this.config.children ?? []).length > 0;

      this.routerPath.pipe(takeUntil(this.stop$)).subscribe((path) => {
        this.active = false;
        const targetLink = this.config.link.replace(/[^A-Za-z0-9-]/g, '');
        path = path.replace(/[^A-Za-z0-9-]/g, '');
        if (path === targetLink) {
          this.active = true;
          this.flzActive.emit();
        } else {
          this.active = false;
        }
      });
    }, 1);
  }

  sendRoute(event: any): void {
    event.stopPropagation();
    if (this.hasChilds && this.active) {
      return;
    }
    if (this.ignoreChild) {
      this.router.navigateByUrl(this.basePath + this.config.link);
      return;
    }
    this.router.navigateByUrl(
      '/' + (this._is_child() || this.ignoreChild)
        ? this.basePath + this.config.link
        : this.config.link
    );
    return;
  }

  private _update_classes(): void {
    this.classes = [
      `${this.baseClass}-wrapper`,
      `${this.baseClass}-wrapper${this._child_or_parent()}`,
    ].join(' ');
  }

  private _is_child(): boolean {
    // temporary fix
    if (this.ignoreChild) return false;
    return this.basePath !== undefined && this.basePath.length > 0;
  }

  _child_or_parent(): string {
    return this._is_child() ? '-for-child' : `-for-parent`;
  }

  _create_path(): string {
    return (this.basePath ?? '') + this.config.link + '/';
  }

  ngOnDestroy(): void {
    this.stop$.next();
  }
}
