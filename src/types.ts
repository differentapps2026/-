/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Movie {
  id: string;
  title: string;
  titleOriginal: string;
  year: number;
  category: 'subbed' | 'dubbed'; // subbed: مترجم, dubbed: مدبلج
  description: string;
  duration: string; // e.g., "1 ساعة و 25 دقيقة"
  rating: number; // e.g., 4.8
  posterGradient: string; // custom aesthetic gradient for each card
  quality: string[]; // e.g. ["1080p", "720p", "480p"]
  soundOptions: string[]; // config e.g., ["دبلجة كارتون نتورك", "دبلجة أصلية ديزني", "العربية الفصحى"]
  scenes: { title: string; time: string; screenshotBg: string }[]; // scenes for the customized progress navigation
  hasNewBadge?: boolean;
  trailerYoutubeId?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface HistoryItem {
  id: string; // unique history record id
  movieId: string;
  watchedAt: string;
  progressMinutes: number;
  totalDurationMinutes: number;
  quality: string;
}

export interface DownloadItem {
  movieId: string;
  progress: number; // 0 to 100
  isCompleted: boolean;
  sizeMb: number;
}

export interface SupportMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  movieId?: string; // option to jump to movie
  type: 'movie' | 'support' | 'system';
}

export interface AppSettings {
  autoPlay: boolean;
  defaultQuality: '1080p' | '720p' | '480p';
  nightMode: boolean; // default: false (but cozy movie warm lights)
  eyeComfortTint: boolean; // warm temperature for night views
}
