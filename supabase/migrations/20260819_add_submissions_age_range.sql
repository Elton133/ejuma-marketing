-- Adds the age-range answer used by the waitlist research questionnaire.
alter table public.submissions
  add column if not exists age_range text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.submissions'::regclass
      and conname = 'submissions_age_range_check'
  ) then
    alter table public.submissions
      add constraint submissions_age_range_check
      check (
        age_range is null or age_range in (
          'Under 18',
          '18-24',
          '25-34',
          '35-44',
          '45-54',
          '55-64',
          '65+'
        )
      );
  end if;
end $$;

create index if not exists submissions_age_range_idx
  on public.submissions (age_range);
