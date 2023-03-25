'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      match_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      map_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      winner: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      home_player_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      home_team_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      away_player_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      away_team_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
      }
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('games');
  }
};