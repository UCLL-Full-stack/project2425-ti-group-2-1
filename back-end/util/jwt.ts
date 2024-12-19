import jwt from 'jsonwebtoken';

export const generateJWTToken = ({ email, name }: { email: string; name: string }): string => {
    const secret = process.env.JWT_SECRET!;
    const expiresIn = `${process.env.JWT_EXPIRES_HOURS}h`;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined.');
    }

    return jwt.sign({ email, name }, secret, { expiresIn });
};
