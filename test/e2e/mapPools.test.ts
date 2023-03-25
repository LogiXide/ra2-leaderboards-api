import { gql } from 'graphql-request'
import { Context } from '../fixtures/index.js'

describe('mapPools', () => {
  const ctx: Context = {}
  const requestHeaders: Record<string, string> = {}

  const fixtures = ['mapPools']

  beforeEach(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures)
  })

  describe('mapPools query', () => {
    it('should be able to return mapPools', async () => {
      const query = gql`
        query($where: MapPoolsWhere, $options: MapPoolsOptions) {
          mapPools(where: $where, options: $options) {
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

      expect(actual.mapPools.data).toBeArrayOfSize(5)
      expect(actual.mapPools.data).toEqual([
        {
          id: ctx.mapPool0.id,
          name: 'mapPool0',
        },
        {
          id: ctx.mapPool1.id,
          name: 'mapPool1',
        },
        {
          id: ctx.mapPool2.id,
          name: 'mapPool2',
        },
        {
          id: ctx.mapPool3.id,
          name: 'mapPool3',
        },
        {
          id: ctx.mapPool4.id,
          name: 'mapPool4',
        },
      ])
      expect(actual.mapPools.pageNumber).toEqual(1)
      expect(actual.mapPools.size).toEqual(100)
      expect(actual.mapPools.totalCount).toEqual(5)
      expect(actual.mapPools.totalPages).toEqual(1)
    })

    it('should be able to return mapPools (pagination)', async () => {
      const query = gql`
        query($where: MapPoolsWhere, $options: MapPoolsOptions) {
          mapPools(where: $where, options: $options) {
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

      expect(actual.mapPools.data).toBeArrayOfSize(2)
      expect(actual.mapPools.data).toEqual([
        {
          id: ctx.mapPool2.id,
          name: 'mapPool2',
        },
        {
          id: ctx.mapPool3.id,
          name: 'mapPool3',
        },
      ])
      expect(actual.mapPools.pageNumber).toEqual(2)
      expect(actual.mapPools.size).toEqual(2)
      expect(actual.mapPools.totalCount).toEqual(5)
      expect(actual.mapPools.totalPages).toEqual(3)
    })
  })

  describe('mapPool query', () => {
    it('should be able to return mapPool', async () => {
      const query = gql`
        query($id: Int!) {
          mapPool(id: $id) {
            id
            name
          }
        }
      `
      const variables = {
        id: ctx.mapPool1.id,
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.mapPool).toEqual({
        id: ctx.mapPool1.id,
        name: 'mapPool1',
      })
    })

    it('should be able to return null (not found)', async () => {
      const query = gql`
        query($id: Int!) {
          mapPool(id: $id) {
            id
            name
          }
        }
      `
      const variables = {
        id: 123456,
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.mapPool).toEqual(null)
    })
  })

  describe('createMapPool mutation', () => {
    it('should be able to create mapPool', async () => {
      const query = gql`
        mutation($input: CreateMapPoolInput!) {
          createMapPool(input: $input) {
            mapPools {
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

      expect(actual.createMapPool.mapPools).toEqual([
        {
          id: expect.any(Number),
          name: 'foobar',
        },
      ])
    })

    it('should be able to create mapPool with maps', async () => {
      const query = gql`
        mutation($input: CreateMapPoolInput!) {
          createMapPool(input: $input) {
            mapPools {
              id
              name
              maps {
                id
                name
              }
            }
          }
        }
      `
      const variables = {
        input: {
          name: 'foobar',
          mapIds: [
            ctx.tiburon.id,
            ctx.dannath.id,
          ],
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.createMapPool.mapPools).toEqual([
        {
          id: expect.any(Number),
          name: 'foobar',
          maps: expect.arrayContaining([
            expect.objectContaining({
              id: ctx.tiburon.id,
              name: 'Tiburon',
            }),
            expect.objectContaining({
              id: ctx.dannath.id,
              name: 'Dannath',
            }),
          ]),
        },
      ])
    })
  })

  describe('updateMapPool mutation', () => {
    it('should be able to update mapPool', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdateMapPoolInput!) {
          updateMapPool(id: $id, input: $input) {
            mapPools {
              id
              name
            }
          }
        }
      `
      const variables = {
        id: ctx.mapPool1.id,
        input: {
          name: 'foobar',
        },
      }
      const actual = await graphqlClient.request(query, variables, requestHeaders)

      expect(actual.updateMapPool.mapPools).toEqual([
        {
          id: ctx.mapPool1.id,
          name: 'foobar',
        },
      ])
    })

    it('should NOT be able to update mapPool', async () => {
      const query = gql`
        mutation($id: Int!, $input: UpdateMapPoolInput!) {
          updateMapPool(id: $id, input: $input) {
            mapPools {
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

      expect(actual.updateMapPool.mapPools).toEqual(null)
    })
  })
})
