-- "Who would you hire?" survey (/survey). One row per person.
-- Kept separate from public.submissions (waitlist + questionnaire).
--
-- Each situation has its own set of columns, prefixed ac_ and electrician_.
-- Specialists are stored by their letter in the survey doc (A, B, C); the
-- profiles behind each letter are in lib/hire-survey.ts, and profiles_version
-- changes whenever those profiles (prices, ratings, names) are edited.

create table if not exists public.hire_survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profiles_version text not null default 'v1',

  -- Situation 1: AC not cooling
  ac_choice text not null check (ac_choice in ('A', 'B', 'C')),
  ac_attracted text[] not null default '{}',
  ac_most_important text,
  ac_why text check (char_length(ac_why) <= 2000),
  ac_put_off_a text[],
  ac_put_off_b text[],
  ac_put_off_c text[],
  ac_missing text[] not null default '{}',
  ac_missing_other text check (char_length(ac_missing_other) <= 2000),
  ac_app_comfort text check (ac_app_comfort in ('Yes', 'Not sure', 'No')),
  ac_app_comfort_why text check (char_length(ac_app_comfort_why) <= 2000),
  ac_order_shown text[] not null default '{}',

  -- Situation 2: sockets stopped working
  electrician_choice text not null check (electrician_choice in ('A', 'B', 'C')),
  electrician_attracted text[] not null default '{}',
  electrician_most_important text,
  electrician_why text check (char_length(electrician_why) <= 2000),
  electrician_put_off_a text[],
  electrician_put_off_b text[],
  electrician_put_off_c text[],
  electrician_missing text[] not null default '{}',
  electrician_missing_other text check (char_length(electrician_missing_other) <= 2000),
  electrician_app_comfort text check (electrician_app_comfort in ('Yes', 'Not sure', 'No')),
  electrician_app_comfort_why text check (char_length(electrician_app_comfort_why) <= 2000),
  electrician_order_shown text[] not null default '{}',

  -- About them (all optional)
  age_range text check (
    age_range is null or age_range in ('Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+')
  ),
  name text check (char_length(name) <= 200),
  phone text check (char_length(phone) <= 40),
  email text check (char_length(email) <= 320)
);

create index if not exists hire_survey_responses_created_at_idx
  on public.hire_survey_responses (created_at desc);

-- The website (anon key) can add a response but can never read, change or
-- delete any. Read them in the Supabase dashboard or with the service key.
alter table public.hire_survey_responses enable row level security;

drop policy if exists "Website can add hire survey responses" on public.hire_survey_responses;
create policy "Website can add hire survey responses"
  on public.hire_survey_responses
  for insert
  to anon
  with check (true);

revoke all on public.hire_survey_responses from anon, authenticated;
grant insert on public.hire_survey_responses to anon;
