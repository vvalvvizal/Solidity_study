const express = require("express");
const app = express();
const { exec } = require("child_process");
const port = 5000;

app.use(express.json());

app.get("/issue-tokens", (req, res) => {
  exec("truffle exec ./scripts/issue-tokens.js", (error, stdout, stderr) => {
    if (error) {
      console.error(error);
    }
    if (stderr) {
      console.error(stderr);
    }
    console.log(stdout);
    res.send("success");
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
