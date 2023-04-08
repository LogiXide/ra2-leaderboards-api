import { gql } from 'graphql-request'
import { Context } from '../fixtures/index.js'

describe('games', () => {
  const ctx: Context = {}
  const requestHeaders: Record<string, string> = {}

  const fixtures = ['games']

  beforeEach(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures)
  })

  describe('games query', () => {
    it('should be able to return games', async () => {
      const query = gql`
        query ($where: GamesWhere, $options: GamesOptions) {
          games(where: $where, options: $options) {
            data {
              id
              type
              winner
              mapId
              matchId
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
            pageNumber
            size
            totalCount
            totalPages
          }
        }
      `
      const variables = {}
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.games.data).toBeArrayOfSize(4)
      expect(actual.games.data).toEqual([
        {
          id: ctx.match0_game0.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.tiburon.id,
          matchId: ctx.match0.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
        {
          id: ctx.match0_game1.id,
          type: 'single',
          winner: 'away',
          mapId: ctx.snow_valley.id,
          matchId: ctx.match0.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
        {
          id: ctx.match0_game2.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.dannath.id,
          matchId: ctx.match0.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
        {
          id: ctx.match1_game0.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.dannath.id,
          matchId: ctx.match1.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.gamzat.id,
          awayTeamId: null,
        },
      ])
      expect(actual.games.pageNumber).toEqual(1)
      expect(actual.games.size).toEqual(100)
      expect(actual.games.totalCount).toEqual(4)
      expect(actual.games.totalPages).toEqual(1)
    })

    it('should be able to return games (pagination)', async () => {
      const query = gql`
        query ($where: GamesWhere, $options: GamesOptions) {
          games(where: $where, options: $options) {
            data {
              id
              type
              winner
              mapId
              matchId
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
            pageNumber
            size
            totalCount
            totalPages
          }
        }
      `
      const variables = {
        options: {
          offset: 2,
          limit: 2,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.games.data).toBeArrayOfSize(2)
      expect(actual.games.data).toEqual([
        {
          id: ctx.match0_game2.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.dannath.id,
          matchId: ctx.match0.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
        {
          id: ctx.match1_game0.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.dannath.id,
          matchId: ctx.match1.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.gamzat.id,
          awayTeamId: null,
        },
      ])
      expect(actual.games.pageNumber).toEqual(2)
      expect(actual.games.size).toEqual(2)
      expect(actual.games.totalCount).toEqual(4)
      expect(actual.games.totalPages).toEqual(2)
    })

    it('should be able to return games (with match)', async () => {
      const query = gql`
        query ($where: GamesWhere, $options: GamesOptions) {
          games(where: $where, options: $options) {
            data {
              id
              type
              winner
              mapId
              matchId
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
              match {
                id
                type
                winner
                homePlayerId
                homeTeamId
                awayPlayerId
                awayTeamId
              }
            }
            pageNumber
            size
            totalCount
            totalPages
          }
        }
      `
      const variables = {
        options: {
          limit: 1,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.games.data).toBeArrayOfSize(1)
      expect(actual.games.data).toEqual([
        {
          id: ctx.match0_game0.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.tiburon.id,
          matchId: ctx.match0.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
          match: {
            id: ctx.match0.id,
            type: 'single',
            winner: 'home',
            homePlayerId: ctx.zhasulan.id,
            homeTeamId: null,
            awayPlayerId: ctx.alexeyk.id,
            awayTeamId: null,
          }
        },
      ])
      expect(actual.games.pageNumber).toEqual(1)
      expect(actual.games.size).toEqual(1)
      expect(actual.games.totalCount).toEqual(4)
      expect(actual.games.totalPages).toEqual(4)
    })

    it('should be able to return games (with map)', async () => {
      const query = gql`
        query ($where: GamesWhere, $options: GamesOptions) {
          games(where: $where, options: $options) {
            data {
              id
              type
              winner
              mapId
              matchId
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
              map {
                id
                name
              }
            }
            pageNumber
            size
            totalCount
            totalPages
          }
        }
      `
      const variables = {
        options: {
          limit: 1,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.games.data).toBeArrayOfSize(1)
      expect(actual.games.data).toEqual([
        {
          id: ctx.match0_game0.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.tiburon.id,
          matchId: ctx.match0.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
          map: {
            id: ctx.tiburon.id,
            name: 'Tiburon',
          }
        },
      ])
      expect(actual.games.pageNumber).toEqual(1)
      expect(actual.games.size).toEqual(1)
      expect(actual.games.totalCount).toEqual(4)
      expect(actual.games.totalPages).toEqual(4)
    })

    it('should be able to return games (filtering, id_EQUALS)', async () => {
      const query = gql`
        query ($where: GamesWhere, $options: GamesOptions) {
          games(where: $where, options: $options) {
            data {
              id
              type
              winner
              mapId
              matchId
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
            pageNumber
            size
            totalCount
            totalPages
          }
        }
      `
      const variables = {
        where: {
          id_EQUALS: ctx.match0_game0.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.games.data).toBeArrayOfSize(1)
      expect(actual.games.data).toEqual([
        {
          id: ctx.match0_game0.id,
          type: 'single',
          winner: 'home',
          mapId: ctx.tiburon.id,
          matchId: ctx.match0.id,
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
      ])
      expect(actual.games.pageNumber).toEqual(1)
      expect(actual.games.size).toEqual(1)
      expect(actual.games.totalCount).toEqual(1)
      expect(actual.games.totalPages).toEqual(1)
    })

    it('should be able to return games (filtering, id_EQUALS, not found)', async () => {
      const query = gql`
        query ($where: GamesWhere, $options: GamesOptions) {
          games(where: $where, options: $options) {
            data {
              id
              type
              winner
              mapId
              matchId
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
            pageNumber
            size
            totalCount
            totalPages
          }
        }
      `
      const variables = {
        where: {
          id_EQUALS: 123456,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.games.data).toBeArrayOfSize(0)
      expect(actual.games.data).toEqual([])
      expect(actual.games.pageNumber).toEqual(1)
      expect(actual.games.size).toEqual(1)
      expect(actual.games.totalCount).toEqual(0)
      expect(actual.games.totalPages).toEqual(1)
    })
  })
})



