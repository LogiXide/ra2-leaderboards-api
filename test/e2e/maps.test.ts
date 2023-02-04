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
        query {
          maps {
            id
            name
          }
        }
      `;
      const variables = {};
      const actual = await graphqlClient.request(query, variables, requestHeaders);

      expect(actual.maps).toBeArrayOfSize(4);
      expect(actual.maps).toEqual([
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
    });
  });
});
