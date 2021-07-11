import { StatusCodes } from "http-status-codes";
import { DB } from "../../db";
import { AccountSignInDto, AccountSignUpDto } from "../auth/auth.dto";
import { PasswordUtil } from "../auth/password.util";
import { ErrorReponse } from "../shared/ApiResponse";

const checkUserExistsByAccountIdentityAndPassword = async (accountSignInDto: AccountSignInDto) => {
    const account = await DB.getAccountsCollection().findOne({
        $or: [{ email: accountSignInDto.accountIdentity }, { phone: accountSignInDto.accountIdentity }],
    });

    if(!account && !(await PasswordUtil.validatePassword(account.password, account))) {
        throw new ErrorReponse(StatusCodes.BAD_REQUEST, "INVALID_CREDENTIALS");
    }

    return account;
};

const createAccount = async (accountSignUpDto: AccountSignUpDto): Promise<{ accountId: number }> => {
    const session = DB.getDbClient().startSession();

    try {
        session.startTransaction();
        const account = await DB.getAccountsCollection().findOne(
            {
                $or: [{ email: accountSignUpDto.email }, { phone: accountSignUpDto.phone }],
            },
            { session }
        );

        if (account) {
            throw new ErrorReponse(StatusCodes.CONFLICT, "ACCOUNT_ALREADY_EXISTS");
        }

        const { hashedPassword, salt } = await PasswordUtil.hashPassword(accountSignUpDto.password);

        const ans = await DB.getAccountsCollection().insertOne({ ...accountSignUpDto, password: hashedPassword, salt }, { session });
        if (ans.result.ok) {
            return {
                accountId: ans.insertedId,
            };
        } else {
            throw new ErrorReponse(StatusCodes.CONFLICT, "ACCOUNT_DID_NOT_CREATE");
        }
    } catch (error) {
        session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

export const AccountsService = {
    createAccount,
    checkUserExistsByAccountIdentityAndPassword,
};
