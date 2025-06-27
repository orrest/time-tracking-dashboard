import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { TimeEntry, TimeFrame, Track, User } from './entities';

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
