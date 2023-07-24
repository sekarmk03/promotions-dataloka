'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      fullname: 'Sekar Madu K.',
      email: 'sekarmadu99@gmail.com',
      password: await bcrypt.hash('secret123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fullname: 'Sekar M.K.',
      email: 'sekarmadu@upi.edu',
      password: await bcrypt.hash('secret123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
