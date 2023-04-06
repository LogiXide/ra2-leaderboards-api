'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('players', [
      {
        name: 'Latof',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'root',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Qien',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Kwos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'LuKez',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Edd',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'kyntaja',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'HCKid',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Marko',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'LGND',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Zhasulan',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rinzler',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gamzat-001',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'DistantQ',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'marsh',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('players', null, {});
  }
};
