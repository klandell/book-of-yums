import db from '../db';

/*
async function fn() {
  const query = SQL`
    UPDATE score
    SET 
      upvotes = upvotes + ${diffUp},
      downvotes = downvotes + ${diffDown},
      ci_lower_bound = ((upvotes + ${diffUp}) /
        (upvotes + ${diffUp} + downvotes + ${diffDown}) +
        (1.96 * 1.96) / (2 * (upvotes + ${diffUp} + downvotes + ${diffDown})) -
        1.96 *
          Math.sqrt(
            (((upvotes + ${diffUp}) /
              (upvotes + ${diffUp} + downvotes + ${diffDown})) *
              (1 -
                (upvotes + ${diffUp}) /
                  (upvotes + ${diffUp} + downvotes + ${diffDown})) +
              (1.96 * 1.96) /
                (4 * (upvotes + ${diffUp} + downvotes + ${diffDown}))) /
              (upvotes + ${diffUp} + downvotes + ${diffDown}),
          )) /
      (1 + (1.96 * 1.96) / (upvotes + ${diffUp} + downvotes + ${diffDown}))
    WHERE id = (
      SELECT id
      FROM recipes
      WHERE recipe_key = ${recipeKey}
    );
  `;
  await db.query(query);
}
*/
