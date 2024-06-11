const express = require("express");
const app = express();
const compression = require('compression');
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const db = process.env.URI || "mongodb://127.0.0.1:27017/covid";
const index = require('./routes/patientRoute');
const admin = require('./routes/admin');
const session = require("express-session");
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("db connected"))
  .catch((e) => console.log(e));


app.use(compression());
app.use(session({
  secret: process.env.ADMIN_COOKIE_PASS || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))
app.use('/admin', admin)
app.use(express.static("public"));

app.use('/sitemap.xml', (req, res) => {
  res.sendFile('public/sitemap/sitemap.xml', {root: __dirname})
});

app.use('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.sendFile('robots.txt', {root: __dirname});
});

app.use('/google81333ec2bff358c9.html', (req, res) => {
  res.sendFile('public/sitemap/google81333ec2bff358c9.html', {root: __dirname})
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use('/', index)



app.use("", (req, res) => {
  res.send("<h1>404 not found</h1>");
});

app.listen(PORT, () => {
  console.log(`listning on port ${PORT}`);
});
