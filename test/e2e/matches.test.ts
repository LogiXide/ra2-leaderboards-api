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

      expect(actual.matches.data).toBeArrayOfSize(5)
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
        {
          id: ctx.match4.id,
          type: 'team',
          winner: 'home',
          homePlayerId: null,
          homeTeamId: ctx.team0.id,
          awayPlayerId: null,
          awayTeamId: ctx.team1.id,
        },
      ])
      expect(actual.matches.pageNumber).toEqual(1)
      expect(actual.matches.size).toEqual(100)
      expect(actual.matches.totalCount).toEqual(5)
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
      expect(actual.matches.totalCount).toEqual(5)
      expect(actual.matches.totalPages).toEqual(3)
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

      expect(actual.matches.data).toBeArrayOfSize(5)
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
        {
          id: ctx.match4.id,
          type: 'team',
          winner: 'home',
          homePlayerId: null,
          homeTeamId: ctx.team0.id,
          awayPlayerId: null,
          awayTeamId: ctx.team1.id,
          games: [],
        },
      ])
      expect(actual.matches.pageNumber).toEqual(1)
      expect(actual.matches.size).toEqual(100)
      expect(actual.matches.totalCount).toEqual(5)
      expect(actual.matches.totalPages).toEqual(1)
    })

    it('should be able to return matches (filtering, id_EQUALS)', async () => {
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
        where: {
          id_EQUALS: ctx.match0.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.matches.data).toBeArrayOfSize(1)
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
      ])
      expect(actual.matches.pageNumber).toEqual(1)
      expect(actual.matches.size).toEqual(1)
      expect(actual.matches.totalCount).toEqual(1)
      expect(actual.matches.totalPages).toEqual(1)
    })

    it('should be able to return matches (filtering, id_EQUALS, not found)', async () => {
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
        where: {
          id_EQUALS: 123456,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.matches.data).toBeArrayOfSize(0)
      expect(actual.matches.data).toEqual([])
      expect(actual.matches.pageNumber).toEqual(1)
      expect(actual.matches.size).toEqual(1)
      expect(actual.matches.totalCount).toEqual(0)
      expect(actual.matches.totalPages).toEqual(1)
    })
  })

  describe('createMatch mutation', () => {
    it('should be able to create match (single)', async () => {
      const query = gql`
        mutation($input: CreateMatchInput!) {
          createMatch(input: $input) {
            matches {
              id
              type
              winner
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
          }
        }
      `
      const variables = {
        input: {
          type: 'single',
          homePlayerId: ctx.alexeyk.id,
          awayPlayerId: ctx.gamzat.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.createMatch.matches).toEqual([
        {
          id: expect.any(Number),
          type: 'single',
          winner: null,
          homePlayerId: ctx.alexeyk.id,
          homeTeamId: null,
          awayPlayerId: ctx.gamzat.id,
          awayTeamId: null,
        },
      ])
    })

    it('should be able to create match (team)', async () => {
      const query = gql`
        mutation($input: CreateMatchInput!) {
          createMatch(input: $input) {
            matches {
              id
              type
              winner
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
          }
        }
      `
      const variables = {
        input: {
          type: 'team',
          homeTeamId: ctx.team0.id,
          awayTeamId: ctx.team1.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.createMatch.matches).toEqual([
        {
          id: expect.any(Number),
          type: 'team',
          winner: null,
          homePlayerId: null,
          homeTeamId: ctx.team0.id,
          awayPlayerId: null,
          awayTeamId: ctx.team1.id,
        },
      ])
    })
  })

  describe('updateMatch mutation', () => {
    it('should be able to update match (single)', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdateMatchInput!) {
          updateMatch(id: $id, input: $input) {
            matches {
              id
              type
              winner
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
        input: {
          winner: 'away',
          homePlayerId: ctx.alexeyk.id,
          awayPlayerId: ctx.zhasulan.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.updateMatch.matches).toEqual([
        {
          id: ctx.match0.id,
          type: 'single',
          winner: 'away',
          homePlayerId: ctx.alexeyk.id,
          homeTeamId: null,
          awayPlayerId: ctx.zhasulan.id,
          awayTeamId: null,
        },
      ])
    })

    it('should be able to update match (team)', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdateMatchInput!) {
          updateMatch(id: $id, input: $input) {
            matches {
              id
              type
              winner
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
          }
        }
      `
      const variables = {
        id: ctx.match4.id,
        input: {
          winner: 'away',
          homeTeamId: ctx.team1.id,
          awayTeamId: ctx.team0.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.updateMatch.matches).toEqual([
        {
          id: ctx.match4.id,
          type: 'team',
          winner: 'away',
          homePlayerId: null,
          homeTeamId: ctx.team1.id,
          awayPlayerId: null,
          awayTeamId: ctx.team0.id,
        },
      ])
    })

    it('should NOT be able to update match', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdateMatchInput!) {
          updateMatch(id: $id, input: $input) {
            matches {
              id
              type
              winner
              homePlayerId
              homeTeamId
              awayPlayerId
              awayTeamId
            }
          }
        }
      `
      const variables = {
        id: 123456,
        input: {
          winner: 'home',
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.updateMatch.matches).toEqual(null)
    })
  })
})
