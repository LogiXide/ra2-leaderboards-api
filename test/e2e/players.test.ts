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

    it('should be able to return players (filtering, id_EQUALS)', async () => {
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
        where: {
          id_EQUALS: ctx.alexeyk.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.players.data).toBeArrayOfSize(1)
      expect(actual.players.data).toEqual([
        {
          id: ctx.alexeyk.id,
          name: 'alexeyk',
        },
      ])
      expect(actual.players.pageNumber).toEqual(1)
      expect(actual.players.size).toEqual(1)
      expect(actual.players.totalCount).toEqual(1)
      expect(actual.players.totalPages).toEqual(1)
    })

    it('should be able to return players (filtering, id_EQUALS, not found)', async () => {
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
        where: {
          id_EQUALS: 123456,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.players.data).toBeArrayOfSize(0)
      expect(actual.players.data).toEqual([])
      expect(actual.players.pageNumber).toEqual(1)
      expect(actual.players.size).toEqual(1)
      expect(actual.players.totalCount).toEqual(0)
      expect(actual.players.totalPages).toEqual(1)
    })

    it('should be able to return players (filtering, name_STARTS_WITH)', async () => {
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
        where: {
          name_STARTS_WITH: 'alexey',
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.players.data).toBeArrayOfSize(1)
      expect(actual.players.data).toEqual([
        {
          id: ctx.alexeyk.id,
          name: 'alexeyk',
        },
      ])
      expect(actual.players.pageNumber).toEqual(1)
      expect(actual.players.size).toEqual(100)
      expect(actual.players.totalCount).toEqual(1)
      expect(actual.players.totalPages).toEqual(1)
    })
  })

  describe('createPlayer mutation', () => {
    it('should be able to create player', async () => {
      const query = gql`
        mutation($input: CreatePlayerInput!) {
          createPlayer(input: $input) {
            players {
              id
              name
            }
          }
        }
      `
      const variables = {
        input: {
          name: 'foobar',
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.createPlayer.players).toEqual([
        {
          id: expect.any(Number),
          name: 'foobar',
        },
      ])
    })
  })

  describe('updatePlayer mutation', () => {
    it('should be able to update player', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdatePlayerInput!) {
          updatePlayer(id: $id, input: $input) {
            players {
              id
              name
            }
          }
        }
      `
      const variables = {
        id: ctx.marko.id,
        input: {
          name: 'foobar',
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.updatePlayer.players).toEqual([
        {
          id: ctx.marko.id,
          name: 'foobar',
        },
      ])
    })

    it('should NOT be able to update player', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdatePlayerInput!) {
          updatePlayer(id: $id, input: $input) {
            players {
              id
              name
            }
          }
        }
      `
      const variables = {
        id: 123456,
        input: {
          name: 'foobar',
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.updatePlayer.players).toEqual(null)
    })
  })
})
