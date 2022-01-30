import { Request, Response } from "express";
//get current logged in user
export async function getCurrentUser(req: Request, res: Response) {
  return res.send(res.locals.user);
}
