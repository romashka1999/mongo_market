import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<{salt: string, hashedPassword: string}> => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return {
        salt,
        hashedPassword
    }
}

const validatePassword = async (password: string, self: any): Promise<boolean> => {
    const hash = await bcrypt.hash(password, self.salt);
    return hash === self.password;
}

export const PasswordUtil = {
    hashPassword,
    validatePassword,
}