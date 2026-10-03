import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly mobileBreakpoint$ =
    this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.TabletPortrait
      ])
      .pipe(
        map(result => result.matches)
      );

  readonly isMobile = toSignal(
    this.mobileBreakpoint$,
    { initialValue: false }
  );

  readonly mobileSidebarOpened = signal(false);

  readonly sidenavMode = computed(() =>
    this.isMobile() ? 'over' : 'side'
  );

  readonly sidebarOpened = computed(() =>
    this.isMobile()
      ? this.mobileSidebarOpened()
      : true
  );

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.mobileSidebarOpened.update(opened => !opened);
    }
  }
}