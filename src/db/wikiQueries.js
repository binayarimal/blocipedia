const Wiki = require("./models").Wiki;
const Authorizer = require("../policies/authoroties");
const Collaborator = require("./models").Collaborator;
const User = require("./models").User;
module.exports = {
  getAllWikis(callback){
    return Wiki.all()
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },
  createWiki(newWiki, callback){
    return Wiki.create(newWiki)
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getWiki(wikiId, callback){
    return Wiki.findById(wikiId)
    .then((wiki)=>{
      callback(null, wiki)
    })
    .catch((err)=>{
      callback(err)
    })

  },
  updateWiki(req, updatedWiki, callback){
    return Wiki.findById(req.params.id)
    .then((wiki) => {

      if(!wiki){
        return callback("Wiki not found");
      }
      const authorized=new Authorizer(req.user, wiki).update();

      if (authorized){
        wiki.update(updatedWiki, {
          fields: Object.keys(updatedWiki)
        })
        .then(() => {
          callback(null, wiki);
        })
        .catch((err) => {
          callback(err);
        });} else {req.flash("You aren't authorized to do that");
      callback("forbidden");}
      });
    },
    deleteWiki(req, callback){
      // #1
      return Wiki.findById(req.params.id)
      .then((wiki) => {
        const authorized=new Authorizer(req.user, wiki).destroy();

        if (authorized){
          wiki.destroy()
          .then((res) => {
            callback(null);
          });
        } else {req.flash("notice","You aren't authorized to do that");
        callback(401);};
      })
      .catch((err) => {
        callback(err);
      });
    },
    privateWiki(wikiId, callback){
      Wiki.update(
        { state: "private" },
        { where: {id : wikiId}
    }).then(()=>{callback(null)})
    .catch(err => callback(err))
  },
  publicWiki(wikiId, callback){
    Wiki.update(
      { state: "public" },
      { where: {id : wikiId}
  }).then(()=>{callback(null)})
  .catch(err => callback(err))
},
addCollaborator(req, callback){

User.findOne({where:{email:req.body.collaborator}})
.then((user)=>{
  return Collaborator.create(
 {email:user.email,
  userId:user.id,
  wikiId:req.params.id})
  .then((collaborator) => {
    callback(null, collaborator);
  })
})
  .catch((err) => {
    callback(err);
  })
},
findCollaborators(req, callback){
   Collaborator.findAll({where:{wikiId:req.params.id}})
  .then((collaborators) => {

     callback(null, collaborators);
     console.log(collaborators)

  })
  .catch((err)=> {
    callback(err);
    console.log(err)
  })
},
 
  }
