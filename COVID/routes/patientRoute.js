const express = require('express');
const router = express.Router();
const User = require('../modals/Patients');
const Admin = require('../modals/Admin');
const TG = require('telegram-bot-api');
require('dotenv').config()
// Define your API object

router.get("", (req, res) => {
    const sucess = [{
        msg: "Namaste Hope u will be fine, if need help click the help button with help message below now"
    }];

    Admin.find({}, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.render("main", {sucess, data: data[0]});
        }
    });
});

router.post("", (req, res) => {
    //   console.log(req.body);
    const {
      patientName,
      patientAge,
      patientGender,
      patientPhoneNo,
      patientAddress,
      need,
      otherNeed,
      Bg
    } = req.body;

    const errors = [];

    if (!patientName || !patientAge || !patientPhoneNo || !patientAddress || !patientGender || !Bg) {
      errors.push({ msg: "plese fill all required feilds" });
    }

    if (patientGender == 'select' || need == 'select'){
        errors.push({msg: 'plese select all slect box'})
    }

    if(patientPhoneNo.length != 10){
        errors.push({msg: 'phone no should be of 10 digits also not contain countery code'});
    }

    if(errors.length > 0){
        Admin.find({}, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.render("main", {sucess: [{msg: "we will respond shortly"}], data: data[0], errors});
            }
        });
    } else {
        
      User.findOne({patientPhoneNo: patientPhoneNo})
          .then(user => {
              if(user) {
                  // user exist
                  errors.push({msg: 'phone no alredy exist'})
                  Admin.find({}, (err, data) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.render("main", {sucess: [{msg: "we will respond shortly"}], data: data[0], errors});
                    }
                });
                  
              } else {
                  const newUser = new User ({
                      patientName,
                      patientAge,
                      patientGender,
                      patientPhoneNo,
                      patientAddress,
                      need,
                      otherNeed,
                      Bg
                  })
                  
                  newUser.save()
                      .then(user => {
                        Admin.find({}, (err, data) => {
                            const api = new TG({
                                token: process.env.TOKEN
                            });
                            // Define your message provider
                            const mp = new TG.GetUpdateMessageProvider()

                            // Set message provider and start API
                            api.setMessageProvider(mp)
                            api.start()
                            .then(() => {
                                console.log('API is started')
                            })
                            .catch(console.err)

                            // Receive messages via event callback

                            try{
                                api.sendMessage({
                                    chat_id: -1001200533058,
                                    text: ` this is auto-generated message by Help India Bot ..... 
${user.patientName} with phone number ${user.patientPhoneNo} want ${user.need == 'other' ? user.otherNeed : user.need == 'plasma' ? ('plasma with blood group ' + (user.Bg).toUpperCase()) : user.need} 
at address ${user.patientAddress} `,
                                }).then(msg => console.log("everything is ok"))
                                .catch(err => console.log(err))
                            }
                            catch(err) {
                                console.log(err);
                            }
                            api.stop();

                            if(err) {
                                console.log(err);
                            } else {
                                
                                                               
                                res.render("main", {sucess: [{msg: "we will respond shortly"}], data: data[0]});
                            }
                        });
                      })
                      .catch(err => console.log(err));
              }
          });
    }
});

module.exports = router