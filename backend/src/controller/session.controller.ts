import { CookieOptions, Request, Response } from "express";
import config from "config";
import { createSession } from "../service/session.service";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
} from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import log from "../utils/logger";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 10 hours
};

export async function googleOauthHandler(req: Request, res: Response) {
  // get the code
  const code = req.query.code as string;
  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });
    //jwt.decode(id_token);

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }
    
    // upsert the user
    const user: any = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token
    const accessToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user.toJSON(), session: session._id },
      { expiresIn: config.get("refreshTokenTtl") } // 10 hours
    );

    // set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // redirect back to client
    res.redirect(config.get("origin"));
  } catch (error: any) {
    log.error(error, "Failed to authorize Google user");
    console.log(error);
    return res.redirect(`${config.get("origin")}/oauth/error`);
  }
}
