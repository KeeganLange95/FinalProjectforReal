const router = require("express").Router();
const { User } = require("../models");

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.body.username}});

        if(userData) {
            res.status(400).json({message: "incorrect username or password, please try again"});
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: "incorrect username or password, please try again"});
            return;
        }

        req.sessions.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({user: userData, message: "you are now logged in!" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/signup", async (req, res) => {
    try{
        const userData = await User.create({
            username: req.body.username,
            email: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({user: userData, message: "you are now signed up and logged in"});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/logout", (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }
});

module.exports = router;