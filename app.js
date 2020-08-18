const express = require("express");

const util = require("./util");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/:user/:repo/compile", (req, res) => {
  const user = req.params.user;
  const repo = req.params.repo;

  try {
    util.compileDocs(user, repo).then(() => {
      util.serveDocs(app, user, repo);
      res.send(`Successfully Compiled Docs! View them at /${user}/${repo}`);
    });
  } catch (error) {
    res.send(
      `Oops. We couldn't render these docs. Check your config if you have one and try again!`
    );
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
