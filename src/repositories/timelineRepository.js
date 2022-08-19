import connection from "../dbStrategy/postgres.js";

async function getPosts() {
  return connection.query(
    `SELECT 
    users.id as "userId",
    users.username AS name,
    users."photo" as photo, 
    posts.description,
    metadata.title AS "metadataTitle",
    metadata.description AS "metadataDescription", 
    metadata.img AS "metadataImg", 
    COUNT(comments."postId") AS "numberOfComments",
    posts.url,
    posts.id as "postId",
    NULL as "repostedByName",
    NULL as "repostedBy",
    posts."createdAt"
    FROM posts
    LEFT JOIN users ON users.id=posts."userId"
    JOIN metadata ON posts.id = metadata."postId"
    LEFT JOIN comments on posts.id = comments."postId"
    GROUP BY posts.id, users.id, metadata.title, metadata.description, metadata.img

    UNION
    
    SELECT 
    u1.id as "userId",
    u1.username AS name,
    u1."photo" as photo, 
    posts.description,
    metadata.title AS "metadataTitle",
    metadata.description AS "metadataDescription", 
    metadata.img AS "metadataImg", 
    COUNT(comments."postId") AS "numberOfComments",
    posts.url,
    posts.id as "postId",
    "reposterUser".username as "repostedByName",
    "reposterUser".id as "repostedBy",
    reposts."createdAt"
    FROM reposts
    LEFT JOIN posts ON reposts."postId"=posts.id
    LEFT JOIN users u1 ON u1.id=posts."userId"
    LEFT JOIN users "reposterUser" ON "reposterUser".id=reposts."userId"
    JOIN metadata ON posts.id = metadata."postId"
    LEFT JOIN comments on posts.id = comments."postId"
    GROUP BY posts.id, u1.id, reposts."createdAt", reposts."userId", "reposterUser".username, "reposterUser".id,metadata.title, metadata.description, metadata.img
    ORDER BY "createdAt" DESC
   LIMIT 20`
  );
}

async function getTrending() {
  return connection.query("SELECT * FROM hashtags ORDER BY id DESC LIMIT 10 ");
}

async function getHashtagPost(hashtag) {
  return connection.query(
    `SELECT posts.id, users.photo AS photo, users.username AS name, users.id AS "userId", posts.description, posts.url, metadata.title AS "metadataTitle", 
    metadata.description AS "metadataDescription", metadata.img AS "metadataImg", COUNT(comments."postId") AS "numberOfComments", hashtags.name AS "hashtagName"
    FROM posts JOIN users ON users.id = posts."userId" 
    JOIN "hashtagsPost" ON "hashtagsPost"."postId" = posts.id 
    JOIN metadata ON posts.id = metadata."postId"
    JOIN hashtags ON "hashtagsPost"."hashtagId" = hashtags.id 
    LEFT JOIN comments on posts.id = comments."postId"
	  WHERE hashtags.name = $1
    GROUP BY posts.id, users.photo, users.username, users.id, metadata.title,  metadata.description, metadata.img, hashtags.name
    ORDER BY posts."createdAt"`,
    [hashtag]
  );
}

export default { getPosts, getTrending, getHashtagPost };
