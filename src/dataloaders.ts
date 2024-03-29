import {
  initMapPoolMapsByMapPoolIdDataLoader,
  initMapPoolMapsByMapIdDataLoader,
  initMapPoolsDataLoader,
  initMapsDataLoader,
} from './maps/dataloaders/index.js'
import {
  initTeamPlayersByTeamIdDataLoader,
  initTeamPlayersByPlayerIdDataLoader,
  initTeamsDataLoader,
  initPlayersDataLoader,
} from './players/dataloaders/index.js'
import {
  initGamesByMatchIdDataLoader,
  initMatchesDataLoader,
} from './matches/dataloaders/index.js'
import { DataLoaders } from './types.js'

export const initDataLoaders = (): DataLoaders => {
  return {
    gamesByMatchId: initGamesByMatchIdDataLoader(),
    mapPoolMapsByMapPoolId: initMapPoolMapsByMapPoolIdDataLoader(),
    mapPoolMapsByMapId: initMapPoolMapsByMapIdDataLoader(),
    mapPools: initMapPoolsDataLoader(),
    maps: initMapsDataLoader(),
    teamPlayersByTeamId: initTeamPlayersByTeamIdDataLoader(),
    teamPlayersByPlayerId: initTeamPlayersByPlayerIdDataLoader(),
    teams: initTeamsDataLoader(),
    players: initPlayersDataLoader(),
    matches: initMatchesDataLoader(),
  }
}
