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
          subject: 'Confirmation Email',
          text: 'You have successfully created an account in blocipedia!',

        };
        try {
          sgMail.send(msg);
        } catch(err) {
          console.log(err)
        };




      };
    });

  },
  signInForm(req, res, next){
    res.render("users/signIn");
  },
  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },
  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },
  upgrade(req,res,next){
    const stripe = require("stripe")(process.env.STRIPE_API_KEY);
    const amount = 1500;
    stripe.customers.create(
      {email:req.body.stripeEmail,
        source:req.body.stripeToken
      })
      .then(customer => stripe.charges.create({
        amount:amount,
        description: "Upgrade to Premium Plan",
        currency:"usd",
        customer:customer.id,
      }).then((charges) =>{
        userQueries.upgrade(req.user.id, (err)=>{
          if(err)
          {req.flash("error", "Could not upgrade your account due to error");
          res.redirect("/")
        }else {
            req.flash("notice","You've successfully updated you account to Premium");
            res.redirect("/");}
          })
        })
      )
    },
    downgrade(req, res, next){
      userQueries.downgrade(req.user.id, (err) => {
        if (err)
        {req.flash("error", "Could not convert user to Standard");
           res.redirect("/")}
        else {
          req.flash("notice", "You've successfully changed your account to standard");
          res.redirect("/")
        }
      })
    }

  }
