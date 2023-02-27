'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('maps', [
      {
        name: 'Heck Freeze Over',
        spots: '4',
        author: 'Westwood Studios',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('maps', null, {});
  }
};
