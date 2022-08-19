import postRepository from "../repositories/postRepository.js";
import { metadataMiddleware } from "../middlewares/urlMetadata.js";
import connection from "../dbStrategy/postgres.js";

export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    await postRepository.deletePostById(id);
    res.status(200).send({ message: "Post deletado com sucesso!" });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function newPost(req, res) {
  const { verified } = res.locals;
  const body = {
    userId: verified.id,
    ...req.body,
  };
  try {
    const re = /#(?:\w+\w+(?=#|$)|\w+\b)/g;
    const searchHashtag = [...body.description.matchAll(re)];

    if (!searchHashtag) {
      const { rows: idPost } = await postRepository.createPost(body);

      await metadataMiddleware(body.url, idPost[0].id);

      return res.status(201).send({ ...body, userPhoto: verified.photo });
    }

    const { rows: findHashtag } = await postRepository.findHashtag(
      searchHashtag
    );

    if (findHashtag.length === 0) {
      const { rows: hashtagId } = await postRepository.insertHashtag(
        searchHashtag
      );
      const { rows: idPost } = await postRepository.createPost(body);

      await postRepository.postHashtag(hashtagId[0].id, idPost[0].id);

      await metadataMiddleware(body.url, idPost[0].id);

      return res.status(201).send({ ...body, userPhoto: verified.photo });
    }

    const { rows: idPost } = await postRepository.createPost(body);
    await postRepository.postHashtag(findHashtag[0].id, idPost[0].id);

    await metadataMiddleware(body.url, idPost[0].id);

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

export async function newRepost(req, res) {
  const { postId, userId } = req.body;
  try {
    await postRepository.addRepost(postId, userId);
    return res.status(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
