-- MauroMotion Database Schema
-- Run this on InsForge PostgreSQL via MCP tool or psql

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT CHECK (type IN ('video', 'web')) NOT NULL,
    mode TEXT CHECK (mode IN ('EDIT_VIDEO', 'CREATE_VIDEO', 'CREATE_WEB')),
    config JSONB DEFAULT '{}',
    duration_seconds INTEGER DEFAULT 60,
    aspect_ratio TEXT DEFAULT '16:9',
    fps INTEGER DEFAULT 30,
    brand JSONB,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storyboards table (for video projects)
CREATE TABLE IF NOT EXISTS storyboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    scene_id TEXT NOT NULL,
    duration REAL NOT NULL,
    script TEXT,
    visual_description TEXT,
    camera TEXT CHECK (camera IN ('static', 'pan', 'zoom', 'tracking')),
    voiceover_url TEXT,
    elements JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, scene_id)
);

-- Timeline items table
CREATE TABLE IF NOT EXISTS timeline_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    track_type TEXT NOT NULL,
    item_id TEXT NOT NULL,
    start REAL NOT NULL,
    end REAL NOT NULL,
    src TEXT,
    text TEXT,
    highlight BOOLEAN DEFAULT FALSE,
    component TEXT,
    props JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, item_id)
);

-- Media table (video/transcription data)
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    video_url TEXT,
    transcription JSONB,
    tracking_data JSONB,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project assets (images, audio files, etc.)
CREATE TABLE IF NOT EXISTS project_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT CHECK (type IN ('image', 'audio', 'video', 'other')),
    size_bytes BIGINT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Web components (for CREATE_WEB mode)
CREATE TABLE IF NOT EXISTS web_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    component_type TEXT NOT NULL CHECK (component_type IN ('section', 'hero', 'card', 'nav', 'footer', 'custom')),
    name TEXT NOT NULL,
    html_css JSON,
    animation_settings JSONB,
    position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_storyboards_project_id ON storyboards(project_id);
CREATE INDEX IF NOT EXISTS idx_timeline_items_project_id ON timeline_items(project_id);
CREATE INDEX IF NOT EXISTS idx_media_project_id ON media(project_id);
CREATE INDEX IF NOT EXISTS idx_project_assets_project_id ON project_assets(project_id);
CREATE INDEX IF NOT EXISTS idx_web_components_project_id ON web_components(project_id);

-- Row level security policies (optional, can be enabled for multi-tenant)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;