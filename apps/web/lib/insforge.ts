import { createClient } from '@insforge/sdk';

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || 'https://gi5rxzv6.us-east.insforge.app';
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'your-anon-key';

// Crear cliente InsForge (configurar con tus credenciales)
export const insforgeClient = createClient({
  baseUrl: INSFORGE_URL,
  anonKey: ANON_KEY,
});

// Tipos para el sistema
export interface ProjectConfig {
  aspectRatio: '16:9' | '9:16' | '1:1';
  fps: number;
  durationSeconds: number;
  brand: {
    colors: string[];
    font: string;
  };
}

export interface ProjectMedia {
  videoUrl?: string;
  transcription?: Array<{
    word: string;
    start: number;
    end: number;
    confidence: number;
    highlighted?: boolean;
  }>;
  trackingData?: any[];
  avatarUrl?: string;
}

// Helper para crear proyecto en InsForge
// NOTA: Estas funciones requieren que el SDK de InsForge tenga el método .from()
// Cuando esté disponible, descomentar y usar:
/*
export async function createProjectInInsForge(project: {
  title: string;
  type: 'video' | 'web';
  mode: 'EDIT_VIDEO' | 'CREATE_VIDEO' | 'CREATE_WEB';
  config: ProjectConfig;
  userId?: string;
}) {
  try {
    const response = await insforgeClient.from('projects').insert({
      title: project.title,
      type: project.type,
      mode: project.mode,
      config: project.config,
      user_id: project.userId || null,
      status: 'draft',
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project in InsForge:', error);
    return null;
  }
}

export async function updateProjectInInsForge(projectId: string, updates: any) {
  try {
    const response = await insforgeClient.from('projects')
      .update(updates)
      .eq('id', projectId);
    return response.data;
  } catch (error) {
    console.error('Error updating project in InsForge:', error);
    return null;
  }
}

export async function getProjectFromInsForge(projectId: string) {
  try {
    const response = await insforgeClient.from('projects')
      .select('*')
      .eq('id', projectId);
    return response.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching project from InsForge:', error);
    return null;
  }
}

export async function saveStoryboard(projectId: string, scenes: any[]) {
  try {
    await insforgeClient.from('storyboards')
      .delete()
      .eq('project_id', projectId);

    const scenesToInsert = scenes.map(scene => ({
      project_id: projectId,
      scene_id: scene.sceneId,
      duration: scene.duration,
      script: scene.script,
      visual_description: scene.visualDescription,
      camera: scene.camera,
      voiceover_url: scene.voiceoverUrl,
      elements: scene.elements || [],
    }));

    const response = await insforgeClient.from('storyboards').insert(scenesToInsert);
    return response.data;
  } catch (error) {
    console.error('Error saving storyboard:', error);
    return null;
  }
}
*/

// Versión placeholder para cuando InsForge esté listo:
export async function createProjectInInsForge(project: {
  title: string;
  type: 'video' | 'web';
  mode: 'EDIT_VIDEO' | 'CREATE_VIDEO' | 'CREATE_WEB';
  config: ProjectConfig;
}) {
  // Simulación local - cuando InsForge esté configurado, usar la versión real
  console.log('Project to save:', project);
  return { id: `local-${Date.now()}`, ...project };
}

export async function updateProjectInInsForge(projectId: string, updates: any) {
  console.log('Updating project:', projectId, updates);
  return { id: projectId, ...updates };
}

export async function getProjectFromInsForge(projectId: string) {
  console.log('Getting project:', projectId);
  return { id: projectId, title: 'Local Project' };
}