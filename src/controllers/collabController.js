const collabQueries = require("../db/collabQueries")
module.exports = {
  collab(req,res,next){

    collabQueries.addCollaborator(req, (err, collaborator) => {
      if(err){
        req.flash("error", "Could not add collaborator with that e-mail id");
        res.redirect(req.headers.referer);
        console.log(err)
      } else {
          res.redirect(`/wikis/${req.params.id}`);
          req.flash("notice", `You've successfully added ${collaborator.email} as a collaborator`);
        }
    })
  },
  destroy(req, res, next){
    collabQueries.deleteCollab(req,(err)=>{
      if(err){
        req.flash("error" ,`Could not remove ${req.body.email} as a collaborator`)
        res.redirect(`/wikis/${req.params.id}`)
      } else{
      res.redirect(`/wikis/${req.params.id}`);
      req.flash("notice" ,`You've removed ${req.body.email} as a collaborator`);
    }
    })
  }
}
