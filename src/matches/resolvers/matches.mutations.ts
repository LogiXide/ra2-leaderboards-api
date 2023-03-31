import { Context } from '../../types.js'
import { Match } from '../db/match.js'

interface ICreateMatchArgs {
  input: {
    type: string
    winner?: string
    homePlayerId?: number
    homeTeamId?: number
    awayPlayerId?: number
    awayTeamId?: number
  };
}

interface ICreateMatchResponse {
  matches: Match[];
}

interface IUpdateMatchArgs {
  id: number;
  input: {
    winner?: string
    homePlayerId?: number
    homeTeamId?: number
    awayPlayerId?: number
    awayTeamId?: number
  };
}

interface IUpdateMatchResponse {
  matches: Match[] | null;
}

const mapsMutations = {
  createMatch: async (parent: unknown, args: ICreateMatchArgs, context: Context): Promise<ICreateMatchResponse> => {
    const match = await context.db.matches.create(args.input)

    return {
      matches: [match],
    }
  },

  updateMatch: async (parent: unknown, args: IUpdateMatchArgs, context: Context): Promise<IUpdateMatchResponse> => {
    const match = await context.db.matches.findByPk(args.id)

    await match?.update(args.input)

    return {
      matches: match ? [match] : null,
    }
  },
}

export default mapsMutations
