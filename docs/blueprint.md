# **App Name**: Procrastination Stopper

## Core Features:

- Module Carousel: Display a carousel of modules on the main screen.
- Module Page: Display the module title, description, and a list of lessons.
- YouTube Player: Integrate a YouTube player that hides the YouTube UI and registers user progress in Firestore every 5 seconds, onPause, and onUnmount. Progress marked complete when watchedSeconds >= durationSec*0.9.
- Continue Watching: List the user's started lessons, ordered by updatedAt desc, with a progress bar and a 'Resume' button.
- Progress Tool: Persist the user's learning progress in Firestore.
- Authentication: Firebase Authentication integration with email/password and anonymous login options.
- Personalized Recommendations: AI-powered tool that uses the user's learning history and preferences to provide personalized module recommendations on the main screen. It takes into account their progress, completed lessons, and topics of interest to suggest relevant modules.

## Style Guidelines:

- Primary color: Soft Teal (#64CCC5), derived from the concepts of focus and progress.
- Background color: Dark navy blue (#0F172A), desaturated, for a premium dark theme as a fallback. Taken from the user's specification, to use in case the landing page colors are not properly extracted.
- Accent color: Lime green (#A7D1AB), analogous to the primary but with higher brightness and saturation to draw focus.
- Body and headline font: 'Inter', a sans-serif font with a modern, machined, objective, neutral look.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use consistent icons from Lucide React library for all UI elements.
- Mobile-first, tab-based navigation. Carousels with smooth animations. Cards for modules and lessons.
- Subtle transitions and animations to improve UX, especially when transitioning between modules, lessons and tabs.