var { request,baseURL } = require('./config/express');
 
describe("Action Routes", () => {
  it("should add an action to the queue", async () => {
    const response = await request(baseURL)
      .post("/actions/add")
      .send({ id: "fausse id " });

    expect(response.statusCode).toBe(404);
   });

  it("should get the queue", async () => {
    const response = await request(baseURL).get("/queue/queue");

    expect(response.statusCode).toBe(200);
    expect(response.body.queue).toBeDefined();
  });
});
