import { gql } from "graphql-request";
import { Context } from "../fixtures/index.js";

describe("maps", () => {
  const ctx: Context = {};
  const requestHeaders: Record<string, string> = {};

  const fixtures = ["maps"];

  beforeAll(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures);
  });

  describe("maps query", () => {
    it("should be able to return maps", async () => {
      const query = gql`
        query($where: MapsWhere, $options: MapsOptions) {
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
        query($where: MapsWhere, $options: MapsOptions) {
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
        }
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
  });
});
