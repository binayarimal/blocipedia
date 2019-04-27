const wikiQueries = require("../db/wikiQueries");
const Authorizer = require("../policies/authoroties");
const markdown = require( "markdown" ).markdown;
module.exports = {
wikiPage(req, res, next){
wikiQueries.getAllWikis((err,wikis) =>{
if (err){
  console.log(err);
    res.redirect(500, "/");
}else{
  res.render("wikis/wikiPage", {wikis})
}

})
},
createPage(req,res,next){
  const authorized=new Authorizer(req.user).new();
  if(authorized){
      res.render("wikis/createPage")
  } else {
    req.flash("notice", "You are not authorized to do that.");
       res.redirect("/wikis");
  }

},
create(req, res, next){
  const authorized=new Authorizer(req.user).create();
  if(authorized){
          let newWiki = {
            title: markdown.toHTML(req.body.title),
            body: markdown.toHTML(req.body.body),
            userId:req.user.id,
          }

          wikiQueries.createWiki(newWiki, (err, wiki) => {
            if(err){
              res.redirect(500, "wikis/createPage");
            } else {
              res.redirect(303, `/wikis/${wiki.id}`);
            }
          });
}else{
     req.flash("notice", "You are not authorized to do that.");
     res.redirect("/wikis");}

},
show(req,res, next){
  wikiQueries.getWiki(req.params.id,(err,wiki)=>{
if(err || wiki === null){
  res.redirect(404, "/")
  console.log(req.params.id)
} else{
  res.render("wikis/show", {wiki})
}
})
},
edit(req,res,next){
  wikiQueries.getWiki(req.params.id,(err,wiki)=>{
  if(err || wiki === null){
  res.redirect(404, "/")
} else{
  const authorized=new Authorizer(req.user, wiki).edit();
  if(authorized){
  res.render("wikis/edit", {wiki})}
  else{
    req.flash("notice", "You are not authorized to do that.");
    res.redirect( `/wikis/${req.params.id}`);}
  }
  })
},
update(req,res,next){

  wikiQueries.updateWiki(req, req.body,(err,wiki)=>{
    if(err || wiki == null){
      res.redirect(401, `/wikis/${req.params.id}/edit`)
    }else{
      res.redirect(`/wikis/${req.params.id}`)
    }
  })
},

destroy(req, res, next){
     wikiQueries.deleteWiki(req, (err) => {
       if(err){
         res.redirect(err, `/wikis/${req.params.id}`)
       } else {
         res.redirect(303, "/wikis")
       }
     });
   },
private(req, res, next){
  wikiQueries.privateWiki(req.params.id,(err)=>{
    if(err){
      req.flash("error","Error: Unable to turn this page private");
      res.redirect(`/wikis/${req.params.id}`)}
    else{
      req.flash("notice","You've privated this page, only you can view it")};
      res.redirect(`/wikis/${req.params.id}`)
  })
},
public(req, res, next){
  wikiQueries.publicWiki(req.params.id,(err)=>{
    if(err){
      req.flash("error","Error: Unable to turn this page public");
      res.redirect(`/wikis/${req.params.id}`)}
    else{
      req.flash("notice","You've made this page public")};
      res.redirect(`/wikis/${req.params.id}`)
  })
},
}
