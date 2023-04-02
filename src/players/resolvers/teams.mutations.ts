import { Context } from '../../types.js'
import { Team } from '../db/team.js'

interface ICreateTeamArgs {
  input: {
    name: string;
  };
};
interface ICreateTeamResponse {
  teams: Team[];
};

interface IUpdateTeamArgs {
  id: number;
  input: {
    name: string;
  };
};

interface IUpdateTeamResponse {
  teams: Team[] | null;
};

const teamsMutations = {
  createTeam: async (parent: unknown, args: ICreateTeamArgs, context: Context): Promise<ICreateTeamResponse> => {
    const team = await context.db.teams.create(args.input)

    return {
      teams: [team],
    }
  },
  updateTeam: async (parent: unknown, args: IUpdateTeamArgs, context: Context): Promise<IUpdateTeamResponse> => {
    const team = await context.db.teams.findByPk(args.id)
    await team?.update(args.input)

    return {
      teams: team ? [team]: null,
    }
  },
}

export default teamsMutations
