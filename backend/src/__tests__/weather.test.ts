import supertest from "supertest";
import createServer from "../utils/server";
const app = createServer();
import mongoose from "mongoose";
const userId = new mongoose.Types.ObjectId().toString();
export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

export const weatherPayload = {
  road: "Block C, Road 5, Section 2, Mirpur",
  city: "ঢাকা",
  postcode: "DHAKA-1216",
  country: "বাংলাদেশ",
};

import { signJwt } from "../utils/jwt.utils";

describe("weather", () => {
  describe("given the user is not logged in", () => {
    it("should return a 403", async () => {
      const address: string = "we will never walk alone!";
      const { statusCode } = await supertest(app).get(
        `/api/weather/${address}`
      );
      expect(statusCode).toBe(403);
    });
  });

//   describe("given the user logged in", () => {
//     it("should weather information of given address", async () => {
//       const jwt = signJwt(userPayload);

//       const { statusCode, body } = await supertest(app)
//         .post("/api/products")
//         .set("Authorization", `Bearer ${jwt}`)
//         .send(weatherPayload);

//       expect(statusCode).toBe(200);
//     });
//   });


});
