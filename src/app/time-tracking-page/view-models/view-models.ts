import { TimeEntry, TimeFrame } from '../services/entities';

export interface TrackVm {
  title: string;
  icon: string;
  color: string;
  timeframe: TimeFrame;
  timeEntry: TimeEntry;
}
