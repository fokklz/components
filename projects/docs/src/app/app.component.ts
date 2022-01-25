import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'docs';

  light = true;

  ngAfterViewInit(): void {
    this.updateHTML();
  }

  toggleTheme(): void {
    this.light = !this.light;
    this.updateHTML();
  }

  updateHTML() {
    document
      .getElementsByTagName('html')[0]
      .setAttribute('data-theme', this.light ? 'light' : 'dark');
  }
}
