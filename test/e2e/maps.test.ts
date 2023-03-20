import { gql } from "graphql-request";
import { Context } from "../fixtures/index.js";

describe("maps", () => {
  const ctx: Context = {};
  const requestHeaders: Record<string, string> = {};

  const fixtures = ["maps"];

  beforeEach(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures);
  });

  describe("maps query", () => {
    it("should be able to return maps", async () => {
      const query = gql`
        query ($where: MapsWhere, $options: MapsOptions) {
          maps(where: $where, options: $options) {
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
      `;
      const variables = {};
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.maps.data).toBeArrayOfSize(4);
      expect(actual.maps.data).toEqual([
        {
          id: ctx.tiburon.id,
          name: "Tiburon",
        },
        {
          id: ctx.snow_valley.id,
          name: "Snow Valley TL v BR",
        },
        {
          id: ctx.dannath.id,
          name: "Dannath",
        },
        {
          id: ctx.estaminia.id,
          name: "Estaminia",
        },
      ]);
      expect(actual.maps.pageNumber).toEqual(1);
      expect(actual.maps.size).toEqual(100);
      expect(actual.maps.totalCount).toEqual(4);
      expect(actual.maps.totalPages).toEqual(1);
    });

    it("should be able to return maps (pagination)", async () => {
      const query = gql`
        query ($where: MapsWhere, $options: MapsOptions) {
          maps(where: $where, options: $options) {
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
      `;
      const variables = {
        options: {
          offset: 2,
          limit: 2,
        },
      };
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.maps.data).toBeArrayOfSize(2);
      expect(actual.maps.data).toEqual([
        {
          id: ctx.dannath.id,
          name: "Dannath",
        },
        {
          id: ctx.estaminia.id,
          name: "Estaminia",
        },
      ]);
      expect(actual.maps.pageNumber).toEqual(2);
      expect(actual.maps.size).toEqual(2);
      expect(actual.maps.totalCount).toEqual(4);
      expect(actual.maps.totalPages).toEqual(2);
    });

    it("should be able to return maps (with map pools)", async () => {
      const query = gql`
        query ($where: MapsWhere, $options: MapsOptions) {
          maps(where: $where, options: $options) {
            data {
              id
              name
              mapPools {
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
      `;
      const variables = {};
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.maps.data).toBeArrayOfSize(4);
      expect(actual.maps.data).toEqual([
        {
          id: ctx.tiburon.id,
          name: "Tiburon",
          mapPools: [
            {
              id: ctx.yr.id,
              name: "Yuri's Revenge",
            },
          ],
        },
        {
          id: ctx.snow_valley.id,
          name: "Snow Valley TL v BR",
          mapPools: [
            {
              id: ctx.yr.id,
              name: "Yuri's Revenge",
            },
          ],
        },
        {
          id: ctx.dannath.id,
          name: "Dannath",
          mapPools: [
            {
              id: ctx.ra2.id,
              name: "Red Alert 2",
            },
          ],
        },
        {
          id: ctx.estaminia.id,
          name: "Estaminia",
          mapPools: [
            {
              id: ctx.ra2.id,
              name: "Red Alert 2",
            },
          ],
        },
      ]);
    });
  });

  describe("map query", () => {
    it("should be able to return map", async () => {
      const query = gql`
        query ($id: Int!) {
          map(id: $id) {
            id
            name
            spots
            imageUrl
            author
          }
        }
      `;
      const variables = {
        id: ctx.estaminia.id,
      };
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.map).toEqual({
        id: ctx.estaminia.id,
        name: "Estaminia",
        spots: 2,
        imageUrl: "https://tempuri.org",
        author: "[RU]Poluy",
      });
    });

    it("should be able to return null (not found)", async () => {
      const query = gql`
        query ($id: Int!) {
          map(id: $id) {
            id
            name
            spots
            imageUrl
            author
          }
        }
      `;
      const variables = {
        id: 123456,
      };
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.map).toEqual(null);
    });
  });

  describe("createMap mutation", () => {
    it("should be able to create map", async () => {
      const query = gql`
        mutation ($input: CreateMapInput!) {
          createMap(input: $input) {
            maps {
              id
              name
              spots
              imageUrl
              author
            }
          }
        }
      `;
      const variables = {
        input: {
          name: "foobar",
          spots: 2,
          imageUrl: "google.com",
          author: "alexei s",
        },
      };
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.createMap.maps).toEqual([
        {
          id: expect.any(Number),
          name: "foobar",
          spots: 2,
          imageUrl: "google.com",
          author: "alexei s",
        },
      ]);
    });
  });

  describe("updateMap mutation", () => {
    it("should be able to update map", async () => {
      const query = gql`
        mutation ($id: Int!, $input: UpdateMapInput!) {
          updateMap(id: $id, input: $input) {
            maps {
              id
              name
              spots
              imageUrl
              author
            }
          }
        }
      `;
      const variables = {
        id: ctx.estaminia.id,
        input: {
          name: "foobar",
          spots: 2,
          imageUrl: "yandex.ru",
          author: "alexei s",
        },
      };
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.updateMap.maps).toEqual([
        {
          id: ctx.estaminia.id,
          name: "foobar",
          spots: 2,
          imageUrl: "yandex.ru",
          author: "alexei s",
        },
      ]);
    });

    it("should NOT be able to update map", async () => {
      const query = gql`
        mutation ($id: Int!, $input: UpdateMapInput!) {
          updateMap(id: $id, input: $input) {
            maps {
              id
              name
              spots
              imageUrl
              author
            }
          }
        }
      `;
      const variables = {
        id: 123456,
        input: {
          name: "foobar",
          spots: 2,
          imageUrl: "yandex.ru",
          author: "alexei s",
        },
      };
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.updateMap.maps).toEqual(null);
    });
  });
});
