import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuService } from './app.menu.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-menuitem]',
  template: `
		<ng-container>
            <div *ngIf="root && item.visible !== false" class="layout-menuitem-root-text">{{item.label}}</div>
			<a *ngIf="(!item.routerLink || item.items) && item.visible !== false" [attr.href]="item.url" (click)="itemClick($event)"
			   [ngClass]="item.class" [attr.target]="item.target" tabindex="0" pRipple>
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}}</span>
				<i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
			</a>
			<a *ngIf="(item.routerLink && !item.items) && item.visible !== false" (click)="itemClick($event)" [ngClass]="item.class"
			   [routerLink]="item.routerLink" routerLinkActive="active-route" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{ paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }"
               [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment"
               [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state" [queryParams]="item.queryParams"
               [attr.target]="item.target" tabindex="0" pRipple>
				<i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.label}}</span>
				<i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
			</a>

			<ul *ngIf="item.items && item.visible !== false" [@children]="submenuAnimation">
				<ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
					<li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child"></li>
				</ng-template>
			</ul>
		</ng-container>
    `,
  animations: [
    trigger('children', [
      state('collapsed', style({
        height: '0'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

  @Input() public item: any;

  @Input() public index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') public root!: boolean;

  @Input() public parentKey!: string;

  public active = false;

  public menuSourceSubscription: Subscription;

  public menuResetSubscription: Subscription;

  public key: string = '';

  constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef, public router: Router, private menuService: MenuService) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe((value: any) => {
      Promise.resolve(null).then(() => {
        if (value.routeEvent) {
          this.active = !!(value.key === this.key || value.key.startsWith(this.key + '-'));
        }
        else {
          if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
            this.active = false;
          }
        }
      });
    });

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((params: any) => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  public ngOnInit(): void {
    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  public updateActiveStateFromRoute(): void {
    const activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });

    if (activeRoute) {
      this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }

  public itemClick(event: Event): void {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    }

    this.menuService.onMenuStateChange({ key: this.key });
  }

  public get submenuAnimation(): any {
    return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
  }

  @HostBinding('class.active-menuitem')
  public get activeClass(): any {
    return this.active && !this.root;
  }

  public ngOnDestroy(): void {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}
