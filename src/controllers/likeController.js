import likeRepository from "../repositories/likeRepository.js";

export async function postLike(req, res) {

    try {

        const { postId } = req.body;
        const { verified } = res.locals;

        const body = [verified.id, postId];

        await likeRepository.giveLike(body);

        res.status(201).send("Curtido!");

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}

export async function deleteLike(req, res) {

    try {

        const { postId } = req.body;
        const { verified } = res.locals;

        const body = [verified.id, postId];

        await likeRepository.removeLike(body);

        res.status(201).send("Descurtido!");

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
