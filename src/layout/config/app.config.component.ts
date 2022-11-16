import { Component, Input } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { MenuService } from '../app.menu.service';

@Component({
  selector: 'app-config',
  templateUrl: './app.config.component.html',
})
export class AppConfigComponent {
  @Input() public minimal: boolean = false;

  public scales: number[] = [12, 13, 14, 15, 16];

  constructor(
    public layoutService: LayoutService,
    public menuService: MenuService
  ) {}

  public get visible(): boolean {
    return this.layoutService.state.configSidebarVisible;
  }

  public set visible(_val: boolean) {
    this.layoutService.state.configSidebarVisible = _val;
  }

  public get scale(): number {
    return this.layoutService.config.scale;
  }

  public set scale(_val: number) {
    this.layoutService.config.scale = _val;
  }


  public onConfigButtonClick(): void {
    this.layoutService.showConfigSidebar();
  }


  public decrementScale(): void {
    this.scale--;
    this.applyScale();
  }

  public incrementScale(): void {
    this.scale++;
    this.applyScale();
  }

  public applyScale(): void {
    document.documentElement.style.fontSize = this.scale + 'px';
  }
}
