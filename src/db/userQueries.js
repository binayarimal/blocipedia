
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Wiki = require("./models").Wiki;

module.exports = {
  // #2
  createUser(newUser, callback){

    // #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    // #4
    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  upgrade(userId, callback){
    User.update(
      { role: 1 },
      { where: {id : userId}
    }).then( () => {callback(null)})
    .catch(err=> callback(err))
  },
  downgrade(userId, callback){
    User.update(
      { role: 0 },
      { where: {id : userId}
    }).then( () => {
      Wiki.update(
        {state:"public"},
        {where:{userId:userId}
      })
      .then(()=>{callback(null)})
    })
    .catch(err=> callback(err))
  },

}
