const ApplicationPolicy = require("./authoroties");

module.exports = class collabPolicy extends ApplicationPolicy {

isCollaborator(){
  record.collaborators.forEach((collab)=>{
    if (collab.id===user.id){
      return true
    }

  })
}
}
