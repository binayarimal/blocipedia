'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {

    title: {
      type:  DataTypes.STRING,
      allowNull:false},

      body: {
        type:  DataTypes.STRING,
        allowNull:false},

        userId: {
          type:  DataTypes.INTEGER,
          allowNull:false},


          state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "public"
          }

        }, {});
        Wiki.associate = function(models) {
          Wiki.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
          });
          Wiki.hasMany(models.Collaborator, {
            foreignKey: "wikiId",
            onDelete: "CASCADE"
          });
        };
        Wiki.prototype.isPrivate = function() {
          return this.state === "private";
        };
        Wiki.prototype.belongsToUser = function(userId){
          return this.userId === userId
        }
        return Wiki;
      };
