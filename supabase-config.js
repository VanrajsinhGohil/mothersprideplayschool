// supabase-config.js
// IMPORT SUPABASE (Usually implemented via CDN on frontend)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> MUST be in the HTML.

const SUPABASE_URL = 'https://kkxrotnwxlidetdnpjmr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreHJvdG53eGxpZGV0ZG5wam1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NzMyMjMsImV4cCI6MjA5MjI0OTIyM30.VtqzUiLkhSx7YZ1n0UZQkMdaPLP8XfXWpdIZR0vH-hU';

window.supabaseClient = null;

if (window.supabase) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase connected successfully.");
} else {
    console.error("Supabase script not found in window.");
}

// Dummy data fallback for UI development without actual DB
const dummyEvents = [
    {
        id: 1,
        title: "Annual Sports Day 2026",
        description: "Join us for a fun-filled day of sports and activities!",
        date: "2026-05-15",
        media: "adorable-hispanic-girl-playing-with-maths-puzzle-game-sitting-table-kindergarten_839833-34736.jpg"
    },
    {
        id: 2,
        title: "Creative Arts Festival",
        description: "A showcase of the amazing artwork created by our talented students.",
        date: "2026-06-20",
        media: "children-playing-together-building-blocks-educational-toys-preschool-kindergarten-kids-little-girls-build-toys-h-90711453.webp"
    }
];

window.getEvents = async () => {
    if (window.supabaseClient) {
        const { data, error } = await window.supabaseClient.from('events').select('*').order('created_at', { ascending: false });
        if (error) { console.error("Error fetching events", error); return []; }
        return data;
    }
    return dummyEvents; // Return dummy data if Supabase isn't setup
};

window.addEvent = async (eventData) => {
    if (!window.supabaseClient) {
        alert("Supabase not configured. This is a dummy success message.");
        console.log("Adding event: ", eventData);
        return { success: true };
    }
    const { data, error } = await window.supabaseClient.from('events').insert([eventData]);
    if (error) { console.error("Error adding event", error); return { success: false, error }; }
    return { success: true, data };
}
