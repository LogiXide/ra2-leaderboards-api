import { gql } from 'graphql-request'
import { Context } from '../fixtures/index.js'

describe('teams', () => {
  const ctx: Context = {}
  const requestHeaders: Record<string, string> = {}

  const fixtures = ['teams']

  beforeAll(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures)
  })

  describe('teams query', () => {
    it('should be able to return teams', async () => {
      const query = gql`
        query($where: TeamsWhere, $options: TeamsOptions) {
          teams(where: $where, options: $options) {
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

      expect(actual.teams.data).toBeArrayOfSize(5)
      expect(actual.teams.data).toEqual([
        {
          id: ctx.team0.id,
          name: 'team0',
        },
        {
          id: ctx.team1.id,
          name: 'team1',
        },
        {
          id: ctx.team2.id,
          name: 'team2',
        },
        {
          id: ctx.team3.id,
          name: 'team3',
        },
        {
          id: ctx.team4.id,
          name: 'team4',
        },
      ])
      expect(actual.teams.pageNumber).toEqual(1)
      expect(actual.teams.size).toEqual(100)
      expect(actual.teams.totalCount).toEqual(5)
      expect(actual.teams.totalPages).toEqual(1)
    })

    it('should be able to return teams (pagination)', async () => {
      const query = gql`
        query($where: TeamsWhere, $options: TeamsOptions) {
          teams(where: $where, options: $options) {
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

      expect(actual.teams.data).toBeArrayOfSize(2)
      expect(actual.teams.data).toEqual([
        {
          id: ctx.team2.id,
          name: 'team2',
        },
        {
          id: ctx.team3.id,
          name: 'team3',
        },
      ])
      expect(actual.teams.pageNumber).toEqual(2)
      expect(actual.teams.size).toEqual(2)
      expect(actual.teams.totalCount).toEqual(5)
      expect(actual.teams.totalPages).toEqual(3)
    })

    it('should be able to return teams (filtering, id_EQUALS)', async () => {
      const query = gql`
        query($where: TeamsWhere, $options: TeamsOptions) {
          teams(where: $where, options: $options) {
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
          id_EQUALS: ctx.team0.id,
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.teams.data).toBeArrayOfSize(1)
      expect(actual.teams.data).toEqual([
        {
          id: ctx.team0.id,
          name: 'team0',
        },
      ])
      expect(actual.teams.pageNumber).toEqual(1)
      expect(actual.teams.size).toEqual(1)
      expect(actual.teams.totalCount).toEqual(1)
      expect(actual.teams.totalPages).toEqual(1)
    })

    it('should be able to return teams (filtering, id_EQUALS, not found)', async () => {
      const query = gql`
        query($where: TeamsWhere, $options: TeamsOptions) {
          teams(where: $where, options: $options) {
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

      expect(actual.teams.data).toBeArrayOfSize(0)
      expect(actual.teams.data).toEqual([])
      expect(actual.teams.pageNumber).toEqual(1)
      expect(actual.teams.size).toEqual(1)
      expect(actual.teams.totalCount).toEqual(0)
      expect(actual.teams.totalPages).toEqual(1)
    })
  })

  describe('createTeam mutation', () => {
    it('should be able to create team', async () => {
      const query = gql`
        mutation($input: CreateTeamInput!) {
          createTeam(input: $input) {
            teams {
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

      expect(actual.createTeam.teams).toEqual([
        {
          id: expect.any(Number),
          name: 'foobar',
        },
      ])
    })
  })

  describe('updateTeam mutation', () => {
    it('should be able to update team', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdateTeamInput!) {
          updateTeam(id: $id, input: $input) {
            teams {
              id
              name
            }
          }
        }
      `
      const variables = {
        id: ctx.team2.id,
        input: {
          name: 'foobar',
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.updateTeam.teams).toEqual([
        {
          id: ctx.team2.id,
          name: 'foobar',
        },
      ])
    })

    it('should NOT be able to update team', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdateTeamInput!) {
          updateTeam(id: $id, input: $input) {
            teams {
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

      expect(actual.updateTeam.teams).toEqual(null)
    })
  })
})
