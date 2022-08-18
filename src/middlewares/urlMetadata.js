import urlMetadata from "url-metadata";
import connection from "../dbStrategy/postgres.js";

export async function metadataMiddleware(url, postId) {
  const metadata = await urlMetadata(url);

  return connection.query(
    `INSERT INTO metadata ("postId", title, img, description) VALUES ($1, $2, $3, $4)`,
    [postId, metadata.title, metadata.image, metadata.description]
  );
}
