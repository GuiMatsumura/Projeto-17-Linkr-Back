import connection from "../dbStrategy/postgres.js";

async function deletePostById(id) {
  const query = `
  DELETE FROM posts WHERE id = $1
  `;

  return connection.query(query, [id]);
};

export default { deletePostById };