const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors("localhost:3000"));

app.use("/", express.static("public"));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/budget", (req, res) => {
    res.sendFile("personal-budget.json", { root: '.' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
