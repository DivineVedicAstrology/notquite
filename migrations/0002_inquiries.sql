create table if not exists inquiries (
  id         serial primary key,
  user_id    text,
  name       text not null,
  email      text not null,
  studio     text,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists inquiries_user_id_idx on inquiries (user_id);
create index if not exists inquiries_created_at_idx on inquiries (created_at desc);
