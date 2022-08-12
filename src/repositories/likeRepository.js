import connection from "../dbStrategy/postgres.js";

function giveLike(body) {

  const query = `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`;

  return connection.query(query, body);

}

export default { giveLike};
