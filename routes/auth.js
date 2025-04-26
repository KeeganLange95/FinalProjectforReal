const router = require("express").Router();
const { User } = require("../models");
const team = require("../models/team");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "incorrect username , please try again" });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "you are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({
        user: userData,
        message: "you are now signed up and logged in",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/team", async (req, res) => {
  try {
    const { member1, member2, member3, member4, member5 } = req.body;

    const teamData = await team.create({
      member1,
      member2,
      member3,
      member4,
      member5,
    });
    req.session.save(() => {
      res.json({
        team: teamData,
        message: "Team saved successfully!",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save team." });
  }
});

module.exports = router;
