create table if not exists site_art (
  slot       text primary key,
  mime       text not null,
  data       text not null,
  user_id    text not null,
  updated_at timestamptz not null default now()
);
