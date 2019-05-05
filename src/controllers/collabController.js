const collabQueries = require("../db/collabQueries")
module.exports = {
  collab(req,res,next){

    collabQueries.addCollaborator(req, (err) => {
      if(err){
        req.flash("error", err);
        res.redirect(500, `/wikis`);
        console.log(err)
      } else {
          req.flash("notice", `You've successfully added collaborator as a collaborator`);
          res.redirect(303, `/wikis/${req.params.id}`);
        }
    })
  },
  destroy(req, res, next){
    collabQueries.deleteCollab(req,(err)=>{
      if(err){
        req.flash("error" ,`Could not remove ${req.body.email} as a collaborator`);
        res.redirect(req.headers.referer);
        console.log(err);
      } else{
        req.flash("notice" ,`You've removed ${req.body.email} as a collaborator`);
        res.redirect(`/wikis/${req.params.id}`);

    }
    })
  }
}
