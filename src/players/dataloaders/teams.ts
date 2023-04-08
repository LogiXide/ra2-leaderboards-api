import _ from 'lodash'
import DataLoader from 'dataloader'
import { Op } from 'sequelize'

import { Team } from '../db/team.js'

export const initTeamsDataLoader = () =>
  new DataLoader(async (ids: Readonly<number[]>): Promise<Array<Team>> => {
    const teams = await Team.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })

    const teamsIndexed = _.keyBy(teams, (it) => it.id)
    const results = ids.map((id) => teamsIndexed[id] as Team)

    return results
  })
