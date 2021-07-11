import { Router, Request, Response } from "express"
import { AccountsService } from "./accounts.service";

const router = Router();


const getAllAccounts = async (req: Request, res: Response) => {
    await AccountsService.getAllAccounts();
    res.send('Hello')
}

router.get("/", getAllAccounts)


export const AccountsController = router;