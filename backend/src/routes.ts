import { Express, Request, Response } from "express";
import { googleOauthHandler } from "./controller/session.controller";
import { getCurrentUser } from "./controller/user.controller";
import { getAddressHandler } from "./controller/address.controller";
import { getWeatherHandler } from "./controller/weather.controller";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/api/me", requireUser, getCurrentUser);
  app.get("/api/sessions/oauth/google", googleOauthHandler);
  app.get("/api/address/:addressName", getAddressHandler);
  app.get("/api/weather/:addressName", requireUser, getWeatherHandler);
}

export default routes;
