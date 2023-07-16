 var { request,baseURL } = require('./config/express');

describe("GET /actions", () => {
 
  it("should return 200", async () => {
    const response = await request(baseURL).get("/actions/actions");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
    expect(Array.isArray(response.body.actions)).toBe(true);
    expect(response.body.actions).toHaveLength(3);

  });
  it("should return 404", async () => {
    const response = await request(baseURL).get("/actions");
    expect(response.statusCode).toBe(404);
  });
});