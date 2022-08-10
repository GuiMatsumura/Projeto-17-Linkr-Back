import bcrypt from 'bcrypt';
import usersRepository from '../repositories/userRepository.js';

export async function validateSignin(req, res, next) {

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

    next();

}
