const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');

        const checkUsername = await db.user.find_user_by_username({ username });
        const foundUser = checkUsername[0];

        if (foundUser) {
            return res.status(400).send(`Username already exists`);
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.user.create_user({ username, hash, profile_pic: `https://robohash.org/${username}.png` });

        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');

        const findUser = await db.user.find_user_by_username({ username });
        const foundUser = findUser[0];
        if (!foundUser) {
            return res.status(404).send(`Username not found`);
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if (!authenticated) {
            return res.status(401).send('Ah, Ah, Ah. You didn\'t say the magic word');
        }

        req.session.user = foundUser;
        res.status(200).send(req.session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        if (req.session.user) {
            return res.send(req.session.user);
        }
        res.status(404).send(`Not found`);
    }
}