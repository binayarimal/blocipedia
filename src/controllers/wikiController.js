const wikiQueries = require("../db/wikiQueries");
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
    res.render("wikis/createPage")
},
create(req, res, next){
          let newWiki = {
            title: req.body.title,
            body: req.body.body,
            userId:req.user.id,
          }

          wikiQueries.createWiki(newWiki, (err, wiki) => {
            if(err){
              res.redirect(500, "wikis/createPage");
            } else {
              res.redirect(303, `/wikis/${wiki.id}`);
            }
          });


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
  console.log(req.params.id)
} else{
  res.render("wikis/edit", {wiki})
}

  })
},
update(req,res,next){

  wikiQueries.updateWiki(req, req.body,(err,wiki)=>{
    if(err || wiki == null){
      res.redirect(404, `/wikis/${req.params.id}/edit`)
    }else{
      res.redirect(`/wikis/${req.params.id}`)
    }
  })


}
}
