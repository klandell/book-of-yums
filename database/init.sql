-- available membership plans
CREATE TABLE membership_plans (
  plan_id serial PRIMARY KEY,
  plan text UNIQUE NOT NULL
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