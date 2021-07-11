import { AccountsService } from "../accounts/accounts.service";
import { AccountSignInDto, AccountSignUpDto } from "./auth.dto";
import { TokenUtil } from "./token.util";

const signIn = async (accountSignInDto: AccountSignInDto) => {
    const account = await AccountsService.checkUserExistsByAccountIdentityAndPassword(accountSignInDto);
    const jwt = TokenUtil.generateToken({ email: account.email, phone: account.phone, _id: account._id });
    return { accessToken: jwt };
};

const signUp = async (accountSignUpDto: AccountSignUpDto) => {
    return await AccountsService.createAccount(accountSignUpDto);
};

export const AuthService = {
    signIn,
    signUp,
};
