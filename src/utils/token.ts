import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET!;
export const createToken = (id: string) => {
    return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "24h" });
}