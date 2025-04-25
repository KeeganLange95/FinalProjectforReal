require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helmet = require("helmet");
const fs = require("fs-extra");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./routes");
const sequelize = require("./config/database");
const CharactersFile = "Characters.json";
//const helpers = require("./utils/helpers");
const { strict } = require("assert");
const { json } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
  helpers: {
    json: (context) => {
      return JSON.stringify(context);
    },
  },
});

const getCharacters = () => {
  return fs.readJsonSync(CharactersFile, { throws: false }) || [];
};

app.get("/characters", (req, res) => {
  const characters = getCharacters();
  res.json(characters);
});

const sess = {
  secret: process.env.SESSION_SECRET,
  Cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: strict,
    maxAge: 24 * 60 * 60 * 1000, //1 day
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
