-- Insert initial brand colors and themes for MauroMotion

-- Brand colors presets
INSERT INTO projects (user_id, title, type, mode, config, status) VALUES
  (NULL, 'MauroMotion Brand Kit', 'web', 'CREATE_WEB', 
   '{
     "colors": {
       "primary": "#00F0FF",
       "secondary": "#7000FF", 
       "accent": "#FF007A",
       "background": "#06070B",
       "card": "#181B26"
     },
     "font": "Inter",
     "fontUrl": "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
   }',
   'template');