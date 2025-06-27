import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DataService } from './services/data.service';
import { NgClass, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TimeFrame, Track, User } from './services/entities';
import { TrackVm } from './view-models/view-models';

@Component({
  selector: 'app-time-tracking-page',
  imports: [NgOptimizedImage, TitleCasePipe, NgClass],
  templateUrl: './time-tracking-page.component.html',
  styleUrl: './time-tracking-page.component.css',
})
export class TimeTrackingPageComponent {
  private dataService = inject(DataService);
  user!: User;
  timeFrames!: TimeFrame[];

  allTracks = toSignal(
    this.dataService.getTracks('fake id').pipe(takeUntilDestroyed()),
    { initialValue: [] },
  );

  selectedFrame: WritableSignal<TimeFrame> = signal<TimeFrame>('daily');

  tracksFilteredByFrame: Signal<TrackVm[]> = computed(() => {
    const selectedFrame = this.selectedFrame();
    console.log(selectedFrame);

    return this.allTracks().map((track: Track): TrackVm => {
      let o = { icon: '', color: '' };
      switch (track.title) {
        case 'Work': {
          o = { icon: 'icon-work.svg', color: 'bg-orange-300' };
          break;
        }
        case 'Play': {
          o = { icon: 'icon-play.svg', color: 'bg-blue-300' };
          break;
        }
        case 'Study': {
          o = { icon: 'icon-study.svg', color: 'bg-pink-400' };
          break;
        }
        case 'Exercise': {
          o = { icon: 'icon-exercise.svg', color: 'bg-green-400' };
          break;
        }
        case 'Social': {
          o = { icon: 'icon-social.svg', color: 'bg-purple-500' };
          break;
        }
        case 'Self Care': {
          o = { icon: 'icon-self-care.svg', color: 'bg-yellow-300' };
          break;
        }
      }

      return {
        title: track.title,
        ...o,
        timeframe: selectedFrame,
        timeEntry: track.timeframes[selectedFrame],
      };
    });
  });

  constructor() {
    this.user = this.dataService.getUser();

    this.timeFrames = this.dataService.getTimeFrames();
  }

  onFrameClick(frame: TimeFrame) {
    this.selectedFrame.update(() => frame);
  }
}
