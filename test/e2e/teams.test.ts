import { gql } from "graphql-request";
import { Context } from "../fixtures/index.js";

describe("teams", () => {
  const ctx: Context = {};
  const requestHeaders: Record<string, string> = {};

  const fixtures = ["teams"];

  beforeAll(async () => {
    await testHelpers.create_postgres_fixtures(ctx, fixtures);
  });

  describe("teams query", () => {
    it("should be able to return teams", async () => {
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
      `;
      const variables = {};
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.teams.data).toBeArrayOfSize(5);
      expect(actual.teams.data).toEqual([
        {
          id: ctx.team0.id,
          name: "team0",
        },
        {
          id: ctx.team1.id,
          name: "team1",
        },
        {
          id: ctx.team2.id,
          name: "team2",
        },
        {
          id: ctx.team3.id,
          name: "team3",
        },
        {
          id: ctx.team4.id,
          name: "team4",
        },
      ]);
      expect(actual.teams.pageNumber).toEqual(1);
      expect(actual.teams.size).toEqual(100);
      expect(actual.teams.totalCount).toEqual(5);
      expect(actual.teams.totalPages).toEqual(1);
    });

    it("should be able to return teams (pagination)", async () => {
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
          id: ctx.team2.id,
          name: "team2",
        },
        {
          id: ctx.team3.id,
          name: "team3",
        },
      ]);
      expect(actual.maps.pageNumber).toEqual(2);
      expect(actual.maps.size).toEqual(2);
      expect(actual.maps.totalCount).toEqual(5);
      expect(actual.maps.totalPages).toEqual(3);
    });
  });
});
