export type MuroMotionMode = 'EDIT_VIDEO' | 'CREATE_VIDEO' | 'CREATE_WEB';

export interface BrandConfig {
  colors: string[];
  font: string;
}

export interface TimelineConfig {
  aspectRatio: '16:9' | '9:16' | '1:1';
  fps: number;
  durationSeconds: number;
  brand: BrandConfig;
}

export interface StoryboardScene {
  sceneId: string;
  duration: number;
  script: string;
  voiceoverUrl?: string;
  visualDescription: string;
  camera: 'static' | 'pan' | 'zoom' | 'tracking';
  elements?: SceneElement[];
}

export interface SceneElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'video' | 'motion-component';
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: string;
  duration?: number;
  startTime?: number;
}

export interface TimelineItem {
  id: string;
  start: number;
  end: number;
  src?: string;
  text?: string;
  highlight?: boolean;
  component?: string;
  props?: Record<string, unknown>;
}

export interface TimelineTrack {
  id: string;
  label: string;
  type: 'video' | 'captions' | 'motion-component' | 'audio' | 'bg-music';
  items: TimelineItem[];
}

export interface TimelineState {
  projectId: string;
  mode: MuroMotionMode;
  config: TimelineConfig;
  storyboard: StoryboardScene[];
  timeline: {
    tracks: TimelineTrack[];
  };
  media?: {
    videoUrl?: string;
    transcription?: TranscriptionWord[];
    trackingData?: TrackingPoint[];
  };
}

export interface TranscriptionWord {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

export interface TrackingPoint {
  time: number;
  type: 'pose' | 'hand' | 'face';
  landmarks: Array<{ x: number; y: number; z?: number; visibility?: number }>;
}

export type { ZodSchema } from 'zod';