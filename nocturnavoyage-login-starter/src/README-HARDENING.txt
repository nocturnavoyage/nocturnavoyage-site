NOCTURNAVOYAGE — HARDENING PATCH

COSA CONTIENE
- App.jsx con redirect al profilo che evita loop (controlla la pathname)
- SignUp.jsx con gestione email-conferma e upsert su 'profiles'

DOVE METTERLI
- Scompatta tutto dentro: /src/
  - App.jsx sovrascrive quello esistente
  - pages/SignUp.jsx sovrascrive quello esistente

SQL CONSIGLIATO (incollalo in Supabase: SQL -> New query)

-- Abilita RLS (se non già attivo)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- L'utente può leggere solo il suo profilo
CREATE POLICY "Read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- L'utente può inserire il proprio profilo
CREATE POLICY "Insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- L'utente può aggiornare il proprio profilo
CREATE POLICY "Update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- (Opzionale) Trigger per creare automaticamente il profilo quando nasce un auth.user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

NOTE
- Se hai conferma email attiva, l'upsert in SignUp viene saltato (non c'è sessione).
  Dopo la conferma via email, fai login -> verrai reindirizzato su /completa-profilo.
