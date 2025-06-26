import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface TimeEntry {
  current: number;
  previous: number;
}

export interface TimeFrames {
  daily: TimeEntry;
  weekly: TimeEntry;
  monthly: TimeEntry;
}

export interface Track {
  title: string;
  timeframes: TimeFrames;
}

export interface User {
  id: string,
  name: string;
  avatar: string;
}

export interface TrackVm {
  title: string;
  timeframe: TimeFrame;
  timeEntry: TimeEntry;
}

/**
 * In the data.json, the frames are nested in the json data as json keys.
 */
export type TimeFrame = 'daily' | 'weekly' | 'monthly';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  getTracks(userId: string) : Observable<Track[]> {
    return this.http.get<Track[]>('data.json');
  }

  getUser(): User {
    return { id: 'fake id', name: 'Jeremy Robson', avatar: 'image-jeremy.png' };
  }

  getTimeFrames(): TimeFrame[] {
    return ['daily', 'weekly', 'monthly'];
  }
}
