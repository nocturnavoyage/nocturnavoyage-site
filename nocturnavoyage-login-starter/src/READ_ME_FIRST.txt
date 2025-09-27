NOCTURNAVOYAGE - FINAL SETUP

1) Install dependencies:
   npm install react-hot-toast

2) Create .env.local from .env.example and set values.

3) Start dev server:
   npm run dev

4) Delete account flow:
   - Removes profile row from `users`.
   - For full auth deletion use Edge Function (see supabase/functions/delete-user).