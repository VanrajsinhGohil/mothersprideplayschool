-- Supabase SQL Configuration for Mothers Pride Playschool

-- 1. Create the events table
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    media JSONB DEFAULT '[]'::jsonb -- Stores array of { "type": "image" | "video", "url": "..." }
);

-- Enable RLS on events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to events
CREATE POLICY "Enable read access for all users" ON public.events
    FOR SELECT USING (true);

-- Allow full access to authenticated admins only
CREATE POLICY "Enable full access for authenticated users only" ON public.events
    FOR ALL USING (auth.role() = 'authenticated');

-- 2. Create the storage bucket for event media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event_media', 'event_media', true);

-- Enable RLS on storage bucket
-- Note: Storage policies attach to `storage.objects`

-- Allow public read access for media
CREATE POLICY "Public Read Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'event_media');

-- Allow authenticated users (Admin) to upload media
CREATE POLICY "Admin Upload Access" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'event_media' AND auth.role() = 'authenticated');

-- Allow authenticated users (Admin) to delete media
CREATE POLICY "Admin Delete Access" ON storage.objects
    FOR DELETE USING (bucket_id = 'event_media' AND auth.role() = 'authenticated');

-- Allow authenticated users (Admin) to update media
CREATE POLICY "Admin Update Access" ON storage.objects
    FOR UPDATE USING (bucket_id = 'event_media' AND auth.role() = 'authenticated');
