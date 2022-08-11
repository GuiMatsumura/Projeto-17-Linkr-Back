import bcrypt from 'bcrypt';
import usersRepository from '../repositories/userRepository.js';
import { signinSchema } from '../schemas/signinSchema.js';

export async function validateSignin(req, res, next) {

    const validation = signinSchema.validate(req.body)

    if (validation.error) {

        res.status(422).send("Email ou password inválido");
        return;

    }

    const { email, password } = req.body;

    const { rows: infoUser } = await usersRepository.getUserByEmail(email);

    if (!infoUser.length) {

        res.status(401).send("Email ou senha inválidos!");
        return;

    }

    if (!bcrypt.compareSync(password, infoUser[0].password)) {

        res.status(401).send("Email ou senha incorretos!");
        return;

    }

    res.locals.infoUser = infoUser[0];

    next();

}
