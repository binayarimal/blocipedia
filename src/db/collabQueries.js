const Authorizer = require("../policies/authoroties");
const Collaborator = require("./models").Collaborator;
const User =  require("./models").User;
const Wiki = require("./models").Wiki;
module.exports = {
addCollaborator(req, callback){

User.findOne({where:{email:req.body.collaborator}})
.then((user)=>{
  return Collaborator.findOne({where:
    {email:req.body.collaborator,
     wikiId:req.params.id}})
     .then((collab)=>{
       if (collab === null){
      Collaborator.create(
     {email:user.email,
      userId:user.id,
      wikiId:req.params.id})
      .then((collaborator) => {
        callback(null, collaborator);
      })
    }
    else {
        req.flash("notice", `You've successfully added ${req.body.collaborator} as a collaborator`);
      callback(404)
      }
     })

})
  .catch((err) => {
    callback(err);
  })
},
getCollaborators(id, callback){
return  Collaborator.findAll({where:{userId:id}})
.then((collaborators)=>{
  callback(null, collaborators)
})
.catch((err)=>{
  callback(err)
})
},
getCollaborator(req, callback){
  Collaborator.findOne({where:
    {userId:req.user.id,
     wikiId:req.params.id}})
     .then((collab) =>{
       callback(null, collab)
     })
     .catch((err)=>{callback(err)})
},
deleteCollab(req, callback){
  Collaborator.findOne(
    {where:
    {email:req.body.deleteCollaborator,
      wikiId:req.params.id}
    }
    )
      .then((collab)=>{

            collab.destroy()
            .then (()=>{
              callback(null)
            })

        })
      .catch((err)=>{
        callback(err)
      })
    },

}
