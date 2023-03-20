import { Context } from "../../types.js";
import { Map } from "../db/map.js";

interface ICreateMapArgs {
  input: {
    name: string;
    spots: number;
    author: string;
    imageUrl: string;
  };
}

interface ICreateMapResponse {
  maps: Map[];
}

interface IUpdateMapArgs {
  id: number;
  input: {
    name: string;
    spots: number;
    author: string;
    imageUrl: string;
  };
}

interface IUpdateMapResponse {
  maps: Map[] | null;
}

const mapsMutations = {
  createMap: async (parent: unknown, args: ICreateMapArgs, context: Context): Promise<ICreateMapResponse> => {
    const Map = await context.db.maps.create(args.input);

    return {
      maps: [Map],
    };
  },

  updateMap: async (parent: unknown, args: IUpdateMapArgs, context: Context): Promise<IUpdateMapResponse> => {
    const map = await context.db.maps.findByPk(args.id);

    await map?.update(args.input);

    return {
      maps: map ? [map] : null,
    };
  },
};

export default mapsMutations;
