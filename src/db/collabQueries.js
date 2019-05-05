const Authorizer = require("../policies/authoroties");
const Collaborator = require("./models").Collaborator;
const User =  require("./models").User;
const Wiki = require("./models").Wiki;
module.exports = {
  addCollaborator(req, callback){
    return User.findOne({where:{email:req.body.collaborator}})
    .then((user)=>{
      if (!user){
        return callback("User doesnot exist")
      };
      Collaborator.findOne({where:
        {email:req.body.collaborator,
          wikiId:req.params.id}
        })
        .then((collab)=>{
          if (collab){
            return  callback ("User is already a collaborator")
          };

          Collaborator.create(
            {email:user.email,
              userId:user.id,
              wikiId:req.params.id})
              .then((collaborator) => {
                callback(null);
              })
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
    return  Collaborator.findOne({where:
        {userId:req.user.id,
         wikiId:req.params.id}})
         .then((collab) =>{
           callback(null, collab)
         })
         .catch((err)=>{callback(err)})
    },
  deleteCollab(req, callback){
    return  Collaborator.findOne(
        {where:
        {email:req.body.deleteCollaborator,
         wikiId:req.params.id}
        }
        )
          .then((collab)=>{
                console.log(req.body.deleteCollaborator)
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
