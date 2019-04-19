const Wiki = require("./models").Wiki;
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
          wiki.update(updatedWiki, {
            fields: Object.keys(updatedWiki)
          })
          .then(() => {
            callback(null, wiki);
          })
          .catch((err) => {
            callback(err);
          });
        });
    },
    deleteWiki(req, callback){
        // #1
        return Wiki.findById(req.params.id)
        .then((wiki) => {
            wiki.destroy()
            .then((res) => {
              callback(null);
            });
        })
        .catch((err) => {
          callback(err);
        });
      },
}
