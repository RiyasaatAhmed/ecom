import { rest } from "msw";
import { setupServer } from "msw/node";
import { ProductList } from "./MockData/Product";

const server = setupServer(
  rest.get("http://localhost:3500/items", (req, res, ctx) => {
    return res(ctx.status(304), ctx.json(ProductList));
  }),
  rest.post("http://localhost:3500/orders", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ statusText: "Created" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, rest };
