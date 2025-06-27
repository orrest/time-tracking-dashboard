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
  id: string;
  name: string;
  avatar: string;
}

/**
 * In the data.json, the frames are nested in the json data as json keys.
 */
export type TimeFrame = 'daily' | 'weekly' | 'monthly';
