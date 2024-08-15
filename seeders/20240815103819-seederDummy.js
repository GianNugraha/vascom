'use strict';
const {
  v4: uuidv4
} = require('uuid');
const hashPassword = require('../helpers/hashPassword');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        username: 'giannugraha',
        email: 'gian.syntax@gmail.com',
        password: hashPassword('1234qwer'),
        role: 'admin',
        isActive:'true',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);

    await queryInterface.bulkInsert('Products', [
      {
      id: uuidv4(),
      name: 'piring',
      price: 12000,
      createdAt: new Date(),
      updatedAt: new Date(), 
      },
      {
      id: uuidv4(),
      name: 'gelas',
      price: 8000,
      createdAt: new Date(),
      updatedAt: new Date(), 
      }
      
    ]);
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product");
    await queryInterface.bulkDelete('User');
  }
};
