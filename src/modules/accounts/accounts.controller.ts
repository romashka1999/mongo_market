import { Router, Request, Response } from "express";

import { AccountsService } from "./accounts.service";

const router = Router();


const getAccountProfile = async (req: Request, res: Response) => {
    await AccountsService.getAccountProfile();
    res.send('Hello')
}

router.get("/profile", getAccountProfile)


export const AccountsController = router;