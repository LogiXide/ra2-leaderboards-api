import { gql } from "graphql-request";
import { Context } from "../fixtures";

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
      console.log(actual.maps);
      expect(actual.maps).toBeArrayOfSize(10);
      expect(actual.maps).toEqual([
        {
          id: ctx.class0.id,
          name: "class0",
        },
      ]);
    });
  });
});
