import { Request, Response } from "express";
import * as oAuthService from "../services/oauth-service";

export async function oAuthLogin(req: Request, res: Response) {
    
    const code = req.body.code;

    const user = await oAuthService.oAuthLogin(code);

    res.status(200).send(user);
  }
  