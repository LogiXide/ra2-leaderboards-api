'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('map_pools', [
      {
        name: 'Red Alert 2 1vs1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Red Alert 2 2vs2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Red Alert 2 3vs3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Red Alert 2 4vs4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Yuri\'s Revenge 1vs1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Yuri\'s Revenge 2vs2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Yuri\'s Revenge 3vs3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Yuri\'s Revenge 4vs4',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('map_pools', null, {});
  }
};
