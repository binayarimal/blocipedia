'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
     "Wikis",
     "state",
     {
       type: Sequelize.STRING,
       allowNull: false,
       defaultValue: "public"
     }
   );
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.removeColumn("Wikis", "state");
  }
};
