import { Context } from '../../types.js'
import { Player } from '../db/player.js'

interface ICreatePlayerArgs {
  input: {
    name: string;
  };
};
interface ICreatePlayerResponse {
  players: Player[];
};

interface IUpdatePlayerArgs {
  id: number;
  input: {
    name: string;
  };
};

interface IUpdatePlayerResponse {
  players: Player[] | null;
};

const playersMutations = {
  createPlayer: async (parent: unknown, args: ICreatePlayerArgs, context: Context): Promise<ICreatePlayerResponse> => {
    const player = await context.db.players.create(args.input)

    return {
      players: [player],
    }
  },

  updatePlayer: async (parent: unknown, args: IUpdatePlayerArgs, context: Context): Promise<IUpdatePlayerResponse> => {
    const player = await context.db.players.findByPk(args.id)

    await player?.update(args.input)

    return {
      players: player ? [player]: null,
    }
  },
}

export default playersMutations
