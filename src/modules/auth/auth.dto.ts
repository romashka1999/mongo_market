
export interface AccountSignUpDto {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
}

export interface AccountSignInDto {
    accountIdentity: string,
    password: string,
}