import supertest from "supertest";
import createServer from "../utils/server";
const app = createServer();
describe("address", () => {
  describe("address does not exist", () => {
    it("should return a 404", async () => {
      const address: string = "we will never walk alone!";
      await supertest(app).get(`/api/address/${address}`).expect(401);
    });
  });

  describe("address does exist", () => {
    it("should return details of the given address", async () => {
      const address: string = "mirpur, dhaka";
      await supertest(app).get(`/api/address/${address}`).expect(200);
    });
  });
});
