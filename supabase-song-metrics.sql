alter table public.songs
add column if not exists play_count integer not null default 0,
add column if not exists likes integer not null default 0;

drop function if exists public.increment_song_play_count(integer);
drop function if exists public.increment_song_likes(integer);
drop function if exists public.increment_song_play_count(bigint);
drop function if exists public.increment_song_likes(bigint);
drop function if exists public.increment_song_play_count_v2(bigint);
drop function if exists public.increment_song_likes_v2(bigint);

create or replace function public.increment_song_play_count_v2(p_song_id bigint)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_play_count integer;
begin
  update public.songs
  set play_count = coalesce(public.songs.play_count, 0) + 1
  where public.songs.id = p_song_id
  returning public.songs.play_count into new_play_count;

  return new_play_count;
end;
$$;

create or replace function public.increment_song_likes_v2(p_song_id bigint)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_likes integer;
begin
  update public.songs
  set likes = coalesce(public.songs.likes, 0) + 1
  where public.songs.id = p_song_id
  returning public.songs.likes into new_likes;

  return new_likes;
end;
$$;

grant usage on schema public to anon, authenticated;
grant execute on function public.increment_song_play_count_v2(bigint) to anon, authenticated;
grant execute on function public.increment_song_likes_v2(bigint) to anon, authenticated;

notify pgrst, 'reload schema';

select
  n.nspname as schema_name,
  p.proname as function_name,
  pg_get_function_arguments(p.oid) as arguments,
  pg_get_function_result(p.oid) as result_type
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'increment_song_play_count_v2',
    'increment_song_likes_v2'
  )
order by p.proname;
