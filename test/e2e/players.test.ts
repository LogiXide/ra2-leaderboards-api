import { gql } from 'graphql-request'
import { Context } from '../fixtures/index.js'

describe('players', () => {
  const ctx: Context = {}
  const requestHeaders: Record<string, string> = {}

  const fixtures = ['players']

  beforeAll(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures)
  })

  describe('players query', () => {
    it('should be able to return players', async () => {
      const query = gql`
        query($where: PlayersWhere, $options: PlayersOptions) {
          players(where: $where, options: $options) {
            data {
              id
              name
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

      expect(actual.players.data).toBeArrayOfSize(7)
      expect(actual.players.data).toEqual([
        {
          id: ctx.zhasulan.id,
          name: '[kz]Zhasulan',
        },
        {
          id: ctx.alexeyk.id,
          name: 'alexeyk',
        },
        {
          id: ctx.gamzat.id,
          name: '[R]Gamzat001',
        },
        {
          id: ctx.marko.id,
          name: 'Sai',
        },
        {
          id: ctx.lgnd.id,
          name: 'LGND',
        },
        {
          id: ctx.kwos.id,
          name: 'Kwos',
        },
        {
          id: ctx.latof.id,
          name: 'Latof',
        },
      ])
      expect(actual.players.pageNumber).toEqual(1)
      expect(actual.players.size).toEqual(100)
      expect(actual.players.totalCount).toEqual(7)
      expect(actual.players.totalPages).toEqual(1)
    })

    it('should be able to return players (pagination)', async () => {
      const query = gql`
        query($where: PlayersWhere, $options: PlayersOptions) {
          players(where: $where, options: $options) {
            data {
              id
              name
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
        }
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.players.data).toBeArrayOfSize(2)
      expect(actual.players.data).toEqual([
        {
          id: ctx.gamzat.id,
          name: '[R]Gamzat001',
        },
        {
          id: ctx.marko.id,
          name: 'Sai',
        },
      ])
      expect(actual.players.pageNumber).toEqual(2)
      expect(actual.players.size).toEqual(2)
      expect(actual.players.totalCount).toEqual(7)
      expect(actual.players.totalPages).toEqual(4)
    })
  })
})
