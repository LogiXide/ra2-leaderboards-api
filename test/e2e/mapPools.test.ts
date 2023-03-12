import { gql } from "graphql-request";
import { Context } from "../fixtures/index.js";

describe("map_pools", () => {
  const ctx: Context = {};
  const requestHeaders: Record<string, string> = {};

  const fixtures = ["mapPools"];

  beforeAll(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures);
  });

  describe("map_pools query", () => {
    it("should be able to return map_pools", async () => {
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
      `;
      const variables = {};
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.mapPools.data).toBeArrayOfSize(5);
      expect(actual.mapPools.data).toEqual([
        {
          id: ctx.mapPool0.id,
          name: "mapPool0",
        },
        {
          id: ctx.mapPool1.id,
          name: "mapPool1",
        },
        {
          id: ctx.mapPool2.id,
          name: "mapPool2",
        },
        {
          id: ctx.mapPool3.id,
          name: "mapPool3",
        },
        {
          id: ctx.mapPool4.id,
          name: "mapPool4",
        },
      ]);
      expect(actual.mapPools.pageNumber).toEqual(1);
      expect(actual.mapPools.size).toEqual(100);
      expect(actual.mapPools.totalCount).toEqual(5);
      expect(actual.mapPools.totalPages).toEqual(1);
    });

    it("should be able to return map_pools (pagination)", async () => {
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
      `;
      const variables = {
        options: {
          offset: 2,
          limit: 2,
        }
      };
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.mapPools.data).toBeArrayOfSize(2);
      expect(actual.mapPools.data).toEqual([
        {
          id: ctx.mapPool2.id,
          name: "mapPool2",
        },
        {
          id: ctx.mapPool3.id,
          name: "mapPool3",
        },
      ]);
      expect(actual.mapPools.pageNumber).toEqual(2);
      expect(actual.mapPools.size).toEqual(2);
      expect(actual.mapPools.totalCount).toEqual(5);
      expect(actual.mapPools.totalPages).toEqual(3);
    });
  });
});
