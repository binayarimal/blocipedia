const collabQueries = require("../db/collabQueries")
module.exports = {
  collab(req,res,next){

    collabQueries.addCollaborator(req, (err, collaborator) => {
      if(err){
        req.flash("error", "Could not find collaborator with that e-mail id");
        res.redirect(`/wikis`);
        console.log(err)
      } else {
          req.flash("notice", `You've successfully added ${collaborator.email} as a collaborator`);
          res.redirect("/");}
    })
  },
}
