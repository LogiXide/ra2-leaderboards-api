'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('teams', [
      {
        name: 'Team kz',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Team Finland',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Team Russia',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Team Jordan',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Team USA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Team UK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Team German',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('players', null, {});
  }
};
