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

export default { postComment };
