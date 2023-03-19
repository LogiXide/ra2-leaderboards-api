'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('maps', [
      {
        name: 'Arabian Oasis',
        spots: '2',
        author: 'saremGts',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Dannatch',
        spots: '2',
        author: 'JaladTanagra',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Divide Freezes Over (PreCaptured)',
        spots: '2',
        author: 'DistantQ & CnCNet QM Team',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Dry Head RA2',
        spots: '2',
        author: 'Westwood Studios',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Estaminia',
        spots: '2',
        author: '[RU]Polye',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Glowing Waters',
        spots: '2',
        author: 'zeiZe',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Landmarks',
        spots: '2',
        author: 'zeiZe',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Little Big Lake LE',
        spots: '2',
        author: 'Westwood, Jalad & Lucifer',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Morningtide (TL vs BR)',
        spots: '2',
        author: 'DistantQ',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Narrow Strip Of Water',
        spots: '2',
        author: 'prry',
        image_url: 'https://tempuri.org',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Official Tournament B',
        spots: '2',
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
