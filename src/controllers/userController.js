const userQueries = require("../db/userQueries.js");

const passport = require("passport");
module.exports = {
  signUp(req, res, next){
    res.render("users/signUp");
  },

  confirmedCreate(req,res,next){
     let newUser = {
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.password_conf
     };
     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/signUp");
       } else {
         passport.authenticate("local")(req, res, () => {
           res.flash("notice", "You've successfully signed in!");
           res.redirect("/");
         })
       };
     });

   },
  create(req, res, next){
console.log(this);
    const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.email,
    from: 'rimal.binaya@gmail.com',
    subject: 'Email Confirmation',
    text: 'Thanks for creqting your account click the button below to confirm',
    html: `<button onclick = ${this.confirmedCreate(req,res,next)} >Confirm</button>`,
  };
  sgMail.send(msg);
  },
}
