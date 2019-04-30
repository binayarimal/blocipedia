
const Collaborator = require("./models").Collaborator;
const User =  require("./models").User;
module.exports = {
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
getCollaborators(id, callback){
return  Collaborator.findAll({where:{userId:id}})
.then((collaborators)=>{
  callback(null, collaborators)
})
.catch((err)=>{callback(err)})
}
}
