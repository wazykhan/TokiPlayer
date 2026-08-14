export interface MediaItem {
  id: string;
  title: string;
  path: string;
  type: 'audio' | 'video';
  thumbnail?: string;
  duration: number;
  categories: string[];
  dateAdded: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}
