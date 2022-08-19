import connection from "../dbStrategy/postgres.js";
import dayjs from "dayjs";
async function postComment(body) {
  const now = dayjs();

  return connection.query(
    `INSERT INTO comments (comment, "postId", "userId", "createdAt") 
  VALUES ($1, $2, $3, $4)`,
    [body.comment, body.postId, body.userId, now]
  );
}

async function getComments(postId) {
  return connection.query(
    `SELECT c.id, c.comment, c."postId", c."userId", users.username, users.photo, c."createdAt"
  FROM comments c 
  JOIN users ON c."userId" = users.id
  WHERE "postId" = $1
  ORDER BY c."createdAt" ASC`,
    [postId]
  );
}

async function getFollowing(userId) {
  return connection.query(
    `SELECT "accountFollowed" FROM followers WHERE "whoFollowed" = $1`,
    [userId]
  );
}
export default { postComment, getComments, getFollowing };
