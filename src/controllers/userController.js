const userQueries = require("../db/userQueries.js");
const passport = require("passport");
module.exports = {
  signUp(req, res, next){
    res.render("users/signUp");
  },





  create(req, res, next){
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
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: req.body.email,
        from: 'rimal.binaya@gmail.com',
        subject: 'Email Confirmation',
        text: "You've successfully created an account on Blocipedia",

        };
        sgMail.send(msg);


      };
    });

  },
}
