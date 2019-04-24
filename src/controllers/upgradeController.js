module.exports ={
upgradePage(req, res, next){
res.render("upgrade/upgradePage")
},
checkout(req,res,next){
  const stripe = require("stripe")("pk_test_m8YN4IfIHbdl5dB1CZfxHYSd00VED9JjLf");

  (async () => {
    const session = await stripe.checkout.sessions.create({
      success_url: '/wikis',
      cancel_url: '/wikis',
      payment_method_types: ['card'],
      line_items: [{
        amount: 1500,
        currency: 'usd',
        name: 'Premium Upgrade',
      }]
    });
  })();
const striped = Stripe('pk_test_m8YN4IfIHbdl5dB1CZfxHYSd00VED9JjLf');
  striped.redirectToCheckout({
  sessionId: '{{CHECKOUT_SESSION_ID}}'
}).then( (result)=> {
console.log(result)
});

}

}
