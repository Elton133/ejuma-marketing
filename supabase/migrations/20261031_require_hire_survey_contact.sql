-- "Who would you hire?" now requires a phone number and an email address.
-- The page checks this too; these constraints stop a row arriving without them.
-- NOT VALID: rows saved before this change (some without contact details) are
-- kept as they are; only new rows are checked.

alter table public.hire_survey_responses
  drop constraint if exists hire_survey_responses_phone_required;
alter table public.hire_survey_responses
  add constraint hire_survey_responses_phone_required
  check (phone is not null and char_length(regexp_replace(phone, '\D', '', 'g')) >= 9) not valid;

alter table public.hire_survey_responses
  drop constraint if exists hire_survey_responses_email_required;
alter table public.hire_survey_responses
  add constraint hire_survey_responses_email_required
  check (email is not null and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$') not valid;
