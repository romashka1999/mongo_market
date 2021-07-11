import { sign, verify } from 'jsonwebtoken';

const expiresIn = 360000;
const secret = 'secret';

const generateToken = (payload: any) => {
    const token = sign(JSON.stringify(payload), secret);
    return token;
}

const verifyToken = (token: string) => {
    try {
        const decoded = verify(token, secret);
        return decoded;
    } catch (error) {
        throw error;
    }
}

export const TokenUtil = {
    generateToken,
    verifyToken,
}