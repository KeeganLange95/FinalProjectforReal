const router = require("express").Router();
const authRoutes = require("./auth");
const homeRoutes = require("./home");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);

router.use((req, res) => {
    res.status(404).render("404", {
        title: "404 - Page Not Found", 
        logged_in: req.session.logged_in
    });
});

module.exports = router;