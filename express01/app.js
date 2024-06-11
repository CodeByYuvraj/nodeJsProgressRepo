


const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 9000,
  path = require("path")
  date = new Date().toDateString(),
  obj = {
    msg: "Twee",
    name: "by:- wow-hack",
    obj: {
      msg:"twees",
      date: date
    }
  },
  User = require('./modal/Twee'),
  mongoose = require('mongoose');

// DB connect
mongoose
  .connect(
    "mongodb+srv://wowadmin:wow-tech@cluster0.htofq.mongodb.net/twee?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to database...."))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  User.find({})
    .populate('_id')
    .exec((err, tweeInfo, count) => {
      res.render("main", {
        obj: obj,
        user: tweeInfo.reverse(),
        hide: false,
        danger: "",
      });
    })

  
});

app.post("/", async (req, res) => {
  if(!req.body.name && !req.body.twee){
    
    res.redirect('back');
  } else{
   
    var str = req.body.twee + "";
      if (str.length > 400){

        User.find({})
          .populate("_id")
          .exec((err, tweeInfo, count) => {
            res.render("main", {
              obj: obj,
              user: tweeInfo.reverse(),
              hide: false,
              danger: "twee must contain 400 letters",
            });
          });

      } else {
        const newUser = new User({
          name: req.body.name,
          twee: req.body.twee,
          date,
        });
        await newUser
          .save()
          .then(() => console.log("twee saved"))
          .catch((err) => console.log(err));

        User.find({})
          .populate("_id")
          .exec((err, tweeInfo, count) => {
            res.render("main", {
              obj: obj,
              user: tweeInfo.reverse(),
              hide: true,
              danger: ""
            });
          });
      }
  }
});

app.use("", (req, res) => {
  res.json({ msg: "not found" });
});

// mongodb+srv://wowadmin:wow-tech@cluster0.htofq.mongodb.net/twee?retryWrites=true&w=majority

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
