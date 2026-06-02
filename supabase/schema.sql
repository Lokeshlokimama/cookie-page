-- Little Bakes Supabase setup for project dopmfrvftsalqtybxcml
-- Run this in Supabase SQL Editor before testing saved order history.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  shipping_address text not null,
  city text not null,
  postal_code text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(10, 2) not null default 0,
  discount numeric(10, 2) not null default 0,
  shipping numeric(10, 2) not null default 0,
  tax numeric(10, 2) not null default 0,
  total_amount numeric(10, 2) not null default 0,
  status text not null default 'Processing',
  created_at timestamptz not null default now()
);

create index if not exists orders_user_created_idx
  on public.orders (user_id, created_at desc);

alter table public.orders enable row level security;

drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own orders" on public.orders;
create policy "Users can create their own orders"
  on public.orders
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
