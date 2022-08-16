import postRepository from "../repositories/postRepository.js";
import { metadataMiddleware } from "../middlewares/urlMetadata.js";
import connection from "../dbStrategy/postgres.js";

export async function newPost(req, res) {
  const { verified } = res.locals;
  const body = {
    userId: verified.id,
    ...req.body,
  };
  try {
    const { rows: searchHashtag } = await postRepository.searchHashtag(body);

    if (searchHashtag.length === 0) {
      const { rows: idPost } = await postRepository.createPost(body);

      await metadataMiddleware(body.url, idPost[0].id);

      return res.status(201).send({ ...body, userPhoto: verified.photo });
    }

    const { rows: findHashtag } = await postRepository.findHashtag(
      searchHashtag
    );

    if (findHashtag.length === 0) {
      const { rows: hashtagId } = await postRepository.insertHashtag(
        searchHashtag[0].hashtag
      );
      const { rows: idPost } = await postRepository.createPost(body);
      await postRepository.postHashtag(hashtagId[0].id, idPost[0].id);

      const { rows: lastPost } = await connection.query(
        'SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 1'
      );
      await metadataMiddleware(body.url, lastPost[0].id);

      return res.status(201).send({ ...body, userPhoto: verified.photo });
    }

    const { rows: idPost } = await postRepository.createPost(body);
    await postRepository.postHashtag(findHashtag[0].id, idPost[0].id);

    const { rows: lastPost } = await connection.query(
      'SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 1'
    );
    await metadataMiddleware(body.url, lastPost[0].id);

    return res.status(201).send({ ...body, userPhoto: verified.photo });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updatePost(req, res) {
  const { description, postId } = req.body;
  try {
    await postRepository.updatePost(description, postId);
    return res.status(200).send(req.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
