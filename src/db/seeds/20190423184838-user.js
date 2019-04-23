'use strict';
const faker = require("faker");

//#2
 let users = [];

 for(let i = 1 ; i <= 15 ; i++){
   users.push({
     email: faker.internet.email(),
     password: faker.random.word(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("Users", null, {});
  }
};
