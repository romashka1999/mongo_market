import { Router, Request, Response } from "express"
import { StatusCodes } from "http-status-codes";

import { ErrorReponse, SuccessReponse } from "../shared/ApiResponse";
import { AuthValidate } from "./auth.validate";
import { AuthService } from "./auth.service";


const router = Router();


const signIn = async (req: Request, res: Response) => {
    try {
        const loggedAccount = await AuthService.signIn(req.body);
        const apiResponse = new SuccessReponse(StatusCodes.CREATED, 'SUCCESSFUL_SIGN_IN', loggedAccount);
        res.status(apiResponse.statusCode).json(apiResponse);
    } catch (error) {
        if(error instanceof ErrorReponse) {
            res.status(error.statusCode).json(error);
        } else {
            const errorReponse = new ErrorReponse(StatusCodes.INTERNAL_SERVER_ERROR, JSON.stringify(error));
            res.status(errorReponse.statusCode).json(errorReponse);
        }
    }
}

const signUp = async (req: Request, res: Response) => {
    try {
        const createdAccount = await AuthService.signUp(req.body);
        const apiResponse = new SuccessReponse(StatusCodes.CREATED, 'SUCCESSFUL_SIGN_UP', createdAccount);
        res.status(apiResponse.statusCode).json(apiResponse);
    } catch (error) {
        if(error instanceof ErrorReponse) {
            res.status(error.statusCode).json(error);
        } else {
            const errorReponse = new ErrorReponse(StatusCodes.INTERNAL_SERVER_ERROR, JSON.stringify(error));
            res.status(errorReponse.statusCode).json(errorReponse);
        }
    }
}

router.post("/sign-up", AuthValidate.validateSignUp, signUp);
router.post("/sign-in", AuthValidate.validateSignUp, signIn);


export const AuthController = router;