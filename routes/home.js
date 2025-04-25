const router = require("express").Router();
const { response } = require("express");
const withAuth = require("../middleware/auth");
const { User } = require("../models");

router.get("/TeamBuilder", withAuth, async (req, res) => {
  const getClicked = (id) => {
    console.log(id);
  };
  try {
    await fetch("http://localhost:3000/characters", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("failed to load api");
        }
      })
      .then((data) => {
        const apiInfo = data;

        res.render("TeamBuilder", {
          title: "TeamBuilder",
          apiInfo,
          logged_in: true,
          getClicked,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      title: "My Profile",
      user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login", {
    title: "Login",
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("./profile");
    return;
  }

  res.render("login", {
    title: "login",
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
