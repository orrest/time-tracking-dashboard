import { Component } from '@angular/core';
import {TimeTrackingPageComponent} from './time-tracking-page/time-tracking-page.component';

@Component({
  selector: 'app-root',
  imports: [TimeTrackingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'time-tracking-dashboard';
}
