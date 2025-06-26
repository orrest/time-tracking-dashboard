import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {DataService, TimeFrame, Track, TrackVm, User} from './services/data.service';
import {NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-time-tracking-page',
  imports: [
    NgOptimizedImage,
    TitleCasePipe
  ],
  templateUrl: './time-tracking-page.component.html',
  styleUrl: './time-tracking-page.component.css'
})
export class TimeTrackingPageComponent {
  private dataService = inject(DataService);
  user!: User;
  timeFrames!: TimeFrame[];

  allTracks = toSignal(
    this.dataService.getTracks('fake id').pipe(takeUntilDestroyed()),
    { initialValue: [] }
  );

  selectedFrame : WritableSignal<TimeFrame> = signal<TimeFrame>('daily');

  tracksFilteredByFrame: Signal<TrackVm[]> = computed(() => {
    const selectedFrame = this.selectedFrame();
    console.log(selectedFrame);

    return this.allTracks().map((track: Track): TrackVm => {
      return {
        title: track.title,
        timeframe: selectedFrame,
        timeEntry: track.timeframes[selectedFrame]
      }
    })
  });

  constructor() {
    this.user = this.dataService.getUser();

    this.timeFrames = this.dataService.getTimeFrames();
  }

  onFrameClick(frame: TimeFrame) {
    this.selectedFrame.update(() => frame);
  }
}
