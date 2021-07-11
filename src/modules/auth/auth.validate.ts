import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { StatusCodes } from "http-status-codes";

import { ApiReponse } from "../shared/ApiResponse";

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const schema = joi.object().keys({
        firstName: joi
            .string()
            .min(2)
            .max(18)
            .required()
            .pattern(new RegExp(/^[A-Za-z ა-ჰ]+$/))
            .message("Bad firstName"),

        lastName: joi
            .string()
            .min(2)
            .max(25)
            .required()
            .pattern(new RegExp(/^[A-Za-z ა-ჰ]+$/))
            .message("Bad lastName"),

        phone: joi
            .string()
            .pattern(new RegExp(/\b5\d{8}\b/))
            .message("Bad phone number")
            .required(),

        email: joi.string().email().required(),

        password: joi.string().required(),
    });

    const { error } = schema.validate(body);

    if (!error) {
        return next();
    }

    const { message } = error.details[0];

    const apiResponse = new ApiReponse(StatusCodes.BAD_REQUEST, false, message);

    return res.json(apiResponse);
};

export const AuthValidate = {
    validateSignUp,
};
