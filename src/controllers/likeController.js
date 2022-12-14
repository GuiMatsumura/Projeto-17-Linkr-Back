import likeRepository from '../repositories/likeRepository.js';

export async function updateLike(req, res) {

    try {

        const { postId, like } = req.body;
        const { verified } = res.locals;

        const body = [verified.id, postId];

        if (!like) {

            await likeRepository.giveLike(body);
            return res.status(201).send("Curtido!");

        }

        await likeRepository.removeLike(body);
        res.status(201).send("Descurtido!");

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}

export async function getLikePostById(req, res) {

    try {

        const { ID_POST } = req.params;

        const body = [ID_POST];

        const { rows: likePost } = await likeRepository.getLikePost(body);

        res.status(200).send(likePost);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}

export async function getLike(req, res) {

    try {

        const { ID_POST } = req.params;

        const { verified } = res.locals;

        const payload = [verified.id, ID_POST];

        const { rows: likePost } = await likeRepository.getLike(payload);

        res.status(200).send(likePost);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }

}
