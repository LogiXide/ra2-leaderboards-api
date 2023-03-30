import { gql } from 'graphql-request'
import { Context } from '../fixtures/index.js'

describe('matches', () => {
  const ctx: Context = {}
  const requestHeaders: Record<string, string> = {}

  const fixtures = ['matches']

  beforeEach(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures)
  })

  describe('matches query', () => {
    it('should be able to return matches', async () => {
      const query = gql`
        query ($where: MatchesWhere, $options: MatchesOptions) {
          matches(where: $where, options: $options) {
            data {
              id
              type
              winner
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

      expect(actual.matches.data).toBeArrayOfSize(4)
      expect(actual.matches.data).toEqual([
        {
          id: ctx.match0.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
        {
          id: ctx.match1.id,
          type: 'single',
          winner: 'away',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.gamzat.id,
          awayTeamId: null,
        },
        {
          id: ctx.match2.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.marko.id,
          awayTeamId: null,
        },
        {
          id: ctx.match3.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
      ])
      expect(actual.matches.pageNumber).toEqual(1)
      expect(actual.matches.size).toEqual(100)
      expect(actual.matches.totalCount).toEqual(4)
      expect(actual.matches.totalPages).toEqual(1)
    })

    it('should be able to return matches (pagination)', async () => {
      const query = gql`
        query ($where: MatchesWhere, $options: MatchesOptions) {
          matches(where: $where, options: $options) {
            data {
              id
              type
              winner
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

      expect(actual.matches.data).toBeArrayOfSize(2)
      expect(actual.matches.data).toEqual([
        {
          id: ctx.match2.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.marko.id,
          awayTeamId: null,
        },
        {
          id: ctx.match3.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
        },
      ])
      expect(actual.matches.pageNumber).toEqual(2)
      expect(actual.matches.size).toEqual(2)
      expect(actual.matches.totalCount).toEqual(4)
      expect(actual.matches.totalPages).toEqual(2)
    })

    it('should be able to return matches (with games)', async () => {
      const query = gql`
        query ($where: MatchesWhere, $options: MatchesOptions) {
          matches(where: $where, options: $options) {
            data {
              id
              type
              winner
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
              games {
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

      expect(actual.matches.data).toBeArrayOfSize(4)
      expect(actual.matches.data).toEqual([
        {
          id: ctx.match0.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
          games: [
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
          ],
        },
        {
          id: ctx.match1.id,
          type: 'single',
          winner: 'away',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.gamzat.id,
          awayTeamId: null,
          games: [
            {
              id: ctx.match1_game0.id,
              type: 'single',
              winner: 'away',
              mapId: ctx.snow_valley.id,
              matchId: ctx.match1.id,
              homePlayerId: ctx.zhasulan.id,
              homeTeamId: null,
              awayPlayerId: ctx.gamzat.id,
              awayTeamId: null,
            },
          ],
        },
        {
          id: ctx.match2.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.marko.id,
          awayTeamId: null,
          games: [],
        },
        {
          id: ctx.match3.id,
          type: 'single',
          winner: 'home',
          homePlayerId: ctx.zhasulan.id,
          homeTeamId: null,
          awayPlayerId: ctx.alexeyk.id,
          awayTeamId: null,
          games: [],
        },
      ])
      expect(actual.matches.pageNumber).toEqual(1)
      expect(actual.matches.size).toEqual(100)
      expect(actual.matches.totalCount).toEqual(4)
      expect(actual.matches.totalPages).toEqual(1)
    })
  })

  describe('match query', () => {
    it('should be able to return match', async () => {
      const query = gql`
        query ($id: Int!) {
          match(id: $id) {
            id
            type
            winner
            homePlayerId
            homeTeamId
            awayPlayerId
            awayTeamId
          }
        }
      `
      const variables = {
        id: ctx.match0.id,
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.match).toEqual({
        id: ctx.match0.id,
        type: 'single',
        winner: 'home',
        homePlayerId: ctx.zhasulan.id,
        homeTeamId: null,
        awayPlayerId: ctx.alexeyk.id,
        awayTeamId: null,
      })
    })

    it.only('should be able to return match (with game)', async () => {
      const query = gql`
        query ($id: Int!) {
          match(id: $id) {
            id
            type
            winner
            homePlayerId
            homeTeamId
            awayPlayerId
            awayTeamId
            games {
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
          }
        }
      `
      const variables = {
        id: ctx.match0.id,
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.match).toEqual({
        id: ctx.match0.id,
        type: 'single',
        winner: 'home',
        homePlayerId: ctx.zhasulan.id,
        homeTeamId: null,
        awayPlayerId: ctx.alexeyk.id,
        awayTeamId: null,
        games: [
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
        ],
      })
    })

    it('should be able to return null (not found)', async () => {
      const query = gql`
        query ($id: Int!) {
          match(id: $id) {
            id
            type
            homePlayerId
            homeTeamId
            awayPlayerId
            awayTeamId
          }
        }
      `
      const variables = {
        id: 123456,
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.match).toEqual(null)
    })
  })
})
