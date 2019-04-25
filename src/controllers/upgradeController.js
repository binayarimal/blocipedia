module.exports ={

upgrade(req,res,next){
  const stripe = require("stripe")(process.env.STRIPE_API_KEY);
   const amount = 1500;
stripe.customers.create(
  {email:req.body.stripeEmail,
  source:req.body.stripeToken
}).then(customer => stripe.charges.create({
  amount:amount,
  description: "Upgrade to Premium Plan",
  currency:"usd",
  customer:customer.id,
}).then((charges) =>{
    req.flash("notice","You've successfully updated you account to Premium")
    res.redirect("/");

})

)

},
downgrade(req, res, next){}

}
