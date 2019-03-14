-- available membership plans
CREATE TABLE membership_plans (
  plan_id serial PRIMARY KEY,
  plan text UNIQUE NOT NULL
);

-- user profiles
CREATE TABLE users (

);

-- upvotes and downvotes for a recipe
CREATE TABLE scores (
  recipe_id integer NOT NULL REFERENCES recipes,
  upvotes integer NOT NULL DEFAULT 0,
  downvotes integer NOT NULL DEFAULT 0,
  ci_lower_bound real NOT NULL DEFAULT 0.0
);

-- index the upvotes and down votes by the lower bound 
-- of Wilson score confidence interval for a Bernoulli parameter
CREATE INDEX ON scores (ci_lower_bound);

--
--

-- setup some initial values
INSERT INTO membership_plans (plan)
VALUES
  ('free'),
  ('pro');


--

--

--


-- basic user info
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_key UUID,
  email,
  hashed_pw,
  admin,
  plan,
  verified,
  created,
  last_login,
  last_billed
);

-- recipe tags
CREATE TABLE tags (
  
);

-- recipe data
CREATE TABLE recipes (
  recipe_id serial PRIMARY KEY,
  recipe_key UUID,
  user_id 
  --
);

-- upvotes and downvotes for a recipe
CREATE TABLE scores (
  recipe_id integer NOT NULL REFERENCES recipes,
  upvotes integer NOT NULL DEFAULT 0,
  downvotes integer NOT NULL DEFAULT 0,
  ci_lower_bound real NOT NULL DEFAULT 0.0
);

-- create helpful indexes
CREATE INDEX ON users (user_key);
CREATE INDEX ON recipes (recipe_key);
CREATE INDEX ON scores (ci_lower_bound);
