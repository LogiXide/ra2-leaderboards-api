'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      winner: {
        allowNull: true,
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
    return queryInterface.dropTable('matches');
  }
};