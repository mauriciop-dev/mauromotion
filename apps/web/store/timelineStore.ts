import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  TimelineState,
  MuroMotionMode,
  TimelineConfig,
  TimelineTrack,
  StoryboardScene,
} from '../types/timeline';

const DEFAULT_CONFIG: TimelineConfig = {
  aspectRatio: '16:9',
  fps: 30,
  durationSeconds: 60,
  brand: {
    colors: ['#00F0FF', '#7000FF', '#0A0A0C'],
    font: 'Inter',
  },
};

interface TimelineStore extends TimelineState {
  setMode: (mode: MuroMotionMode) => void;
  setConfig: (config: Partial<TimelineConfig>) => void;
  addTrack: (track: TimelineTrack) => void;
  removeTrack: (trackId: string) => void;
  updateTrack: (track: TimelineTrack) => void;
  addStoryboardScene: (scene: StoryboardScene) => void;
  updateStoryboardScene: (sceneId: string, scene: Partial<StoryboardScene>) => void;
  resetProject: () => void;
  duplicateProject: () => string;
  uploadVideo: (file: File) => Promise<string>;
  processVideo: (projectId: string) => Promise<void>;
  generateFromPrompt: (prompt: string) => Promise<string>;
}

const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || 'http://localhost:8000';

export const useTimelineStore = create<TimelineStore>()(
  devtools(
    persist(
      (set, get) => ({
        projectId: `project-${Date.now()}`,
        mode: 'CREATE_VIDEO',
        config: DEFAULT_CONFIG,
        storyboard: [],
        timeline: {
          tracks: [
            {
              id: 'track-video-base',
              label: 'Video Principal',
              type: 'video',
              items: [],
            },
            {
              id: 'track-captions',
              label: 'Subtítulos Dinámicos',
              type: 'captions',
              items: [],
            },
            {
              id: 'track-motion-graphics',
              label: 'Overlays React / Remotion',
              type: 'motion-component',
              items: [],
            },
          ],
        },
        setMode: (mode) => set({ mode, projectId: `project-${Date.now()}` }),
        setConfig: (config) =>
          set((state) => ({
            config: { ...state.config, ...config },
          })),
        addTrack: (track) =>
          set((state) => ({
            timeline: {
              ...state.timeline,
              tracks: [...state.timeline.tracks, track],
            },
          })),
        removeTrack: (trackId) =>
          set((state) => ({
            timeline: {
              ...state.timeline,
              tracks: state.timeline.tracks.filter((t) => t.id !== trackId),
            },
          })),
        updateTrack: (track) =>
          set((state) => ({
            timeline: {
              ...state.timeline,
              tracks: state.timeline.tracks.map((t) =>
                t.id === track.id ? { ...t, ...track } : t,
              ),
            },
          })),
        addStoryboardScene: (scene) =>
          set((state) => ({
            storyboard: [...state.storyboard, scene],
          })),
        updateStoryboardScene: (sceneId, updates) =>
          set((state) => ({
            storyboard: state.storyboard.map((scene) =>
              scene.sceneId === sceneId ? { ...scene, ...updates } : scene,
            ),
          })),
        resetProject: () =>
          set({
            projectId: `project-${Date.now()}`,
            mode: 'CREATE_VIDEO',
            config: DEFAULT_CONFIG,
            storyboard: [],
            timeline: {
              tracks: [
                {
                  id: 'track-video-base',
                  label: 'Video Principal',
                  type: 'video',
                  items: [],
                },
                {
                  id: 'track-captions',
                  label: 'Subtítulos Dinámicos',
                  type: 'captions',
                  items: [],
                },
                {
                  id: 'track-motion-graphics',
                  label: 'Overlays React / Remotion',
                  type: 'motion-component',
                  items: [],
                },
              ],
            },
            media: undefined,
          }),
        duplicateProject: () => {
          const newId = `project-${Date.now()}`;
          set({ projectId: newId });
          return newId;
        },
        
        // Nuevas acciones con API
        uploadVideo: async (file) => {
          const projectId = `project-${Date.now()}`;
          const formData = new FormData();
          formData.append('file', file);
          
          try {
            const response = await fetch(`${ENGINE_URL}/upload-video`, {
              method: 'POST',
              body: formData,
            });
            
            const data = await response.json();
            
            set((state) => ({
              projectId: data.project_id || projectId,
              timeline: {
                ...state.timeline,
                tracks: state.timeline.tracks.map(t => 
                  t.type === 'video' 
                    ? { ...t, items: [{ ...t.items[0], src: data.video_url || URL.createObjectURL(file) }] }
                    : t
                )
              }
            }));
            
            return data.project_id || projectId;
          } catch (error) {
            console.error('Error uploading video:', error);
            return projectId;
          }
        },
        
        processVideo: async (projectId) => {
          try {
            const response = await fetch(`${ENGINE_URL}/process-video`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ project_id: projectId }),
            });
            
            const data = await response.json();
            console.log('Processing result:', data);
          } catch (error) {
            console.error('Error processing video:', error);
          }
        },
        
        generateFromPrompt: async (prompt) => {
          const projectId = `project-${Date.now()}`;
          
          try {
            // This would call the AI generation API
            console.log('Generating from prompt:', prompt);
          } catch (error) {
            console.error('Error generating from prompt:', error);
          }
          
          return projectId;
        },
      }),
      {
        name: 'mauromotion-timeline-store',
        getStorage: () =>
          typeof window !== 'undefined'
            ? window.localStorage
            : (() => {
                let store: Record<string, string> = {};
                return {
                  getItem: (name: string) => store[name] ?? null,
                  setItem: (name: string, value: string) => {
                    store[name] = value;
                  },
                  removeItem: (name: string) => {
                    delete store[name];
                  },
                };
              })(),
      },
    ),
  )
);