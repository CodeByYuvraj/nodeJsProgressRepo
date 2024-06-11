const express = require("express"),
  app = express(),
  cors = require("cors"),
  PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    msg: "welcome",
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    msg: "user added",
  });
});

app.listen(PORT, () => {
  console.log("server started");
});
