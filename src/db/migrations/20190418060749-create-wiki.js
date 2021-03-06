'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wikis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      private: {
        type: Sequelize.BOOLEAN
      },
      userId: {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE", // delete post if parent topic is deleted
      allowNull: false,    // validation to prevent null value
      references: {        // association information
        model: "Users",   // table name
        key: "id",         // attribute to use
        as: "userId"      // reference as topicId
      }
    },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wikis');
  }
};
