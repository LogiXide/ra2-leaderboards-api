'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const playerMap = new Map();
    const teamMap = new Map();

    const players = await queryInterface.select(null, 'players');
    players.forEach(player => {
      playerMap.set(player.name, player.id);
    });

    const teams = await queryInterface.select(null, 'teams');
    teams.forEach(team => {
      teamMap.set(team.name, team.id);
    });

    return queryInterface.bulkInsert('matches', [
      {
        type: 'single',
        home_player_id: playerMap.get('Zhasulan'),
        away_player_id: playerMap.get('Rinzler'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'single',
        home_player_id: playerMap.get('Latof'),
        away_player_id: playerMap.get('root'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'single',
        home_player_id: playerMap.get('Qien'),
        away_player_id: playerMap.get('Kwos'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'single',
        home_player_id: playerMap.get('kyntaja'),
        away_player_id: playerMap.get('Edd'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'single',
        home_player_id: playerMap.get('LGND'),
        away_player_id: playerMap.get('Marko'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'team',
        home_team_id: teamMap.get('Team kz'),
        away_team_id: teamMap.get('Team Russia'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'team',
        home_team_id: teamMap.get('Team Finland'),
        away_team_id: teamMap.get('Team Jordan'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'team',
        home_team_id: teamMap.get('Team USA'),
        away_team_id: teamMap.get('Team UK'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'team',
        home_team_id: teamMap.get('Team Jordan'),
        away_team_id: teamMap.get('Team Germany'),
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('matches', null, {});
  }
};
