import _ from 'lodash'
import { Op } from 'sequelize'

import { Context } from '../../types.js'
import { Team } from '../db/team.js'

interface ICreateTeamArgs {
  input: {
    name: string;
    playerIds?: number[]
  };
};
interface ICreateTeamResponse {
  teams: Team[];
};

interface IUpdateTeamArgs {
  id: number;
  input: {
    name: string;
    playerIds?: number[]
  };
};

interface IUpdateTeamResponse {
  teams: Team[] | null;
};

const teamsMutations = {
  createTeam: async (parent: unknown, args: ICreateTeamArgs, context: Context): Promise<ICreateTeamResponse> => {
    const team = await context.db.teams.create(args.input)

    if (args.input.playerIds) {
      // TODO: validation
      const players = await context.db.players.findAll({
        where: {
          id: {
            [Op.in]: args.input.playerIds,
          }
        }
      })
      await team.$add('players', players)
    }

    return {
      teams: [team],
    }
  },

  updateTeam: async (parent: unknown, args: IUpdateTeamArgs, context: Context): Promise<IUpdateTeamResponse> => {
    const team = await context.db.teams.findByPk(args.id)

    if (team) {
      await team.update(args.input)

      if (args.input.playerIds) {
        // TODO: validation

        const existingPlayers = await team.$get('players')
        const updatedPlayers = await context.db.players.findAll({
          where: {
            id: {
              [Op.in]: args.input.playerIds,
            }
          }
        })

        const addedPlayers = _.differenceBy(updatedPlayers, existingPlayers, x => x.id)
        const removedPlayers = _.differenceBy(existingPlayers, updatedPlayers, x => x.id)

        await team.$add('players', addedPlayers)
        await team.$remove('players', removedPlayers)
      }
    }

    return {
      teams: team ? [team]: null,
    }
  },
}

export default teamsMutations
