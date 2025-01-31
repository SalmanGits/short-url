import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../../models/user.model';
import { createToken } from '../../utils/token';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;


const client = new OAuth2Client(CLIENT_ID);

export const googleSignIn = async (req: Request, res: Response, next: NextFunction) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        const { sub: googleId, name, email, picture } = payload;
        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({ googleId, name, email, picture });
            await user.save();
        }


        const token = createToken(user._id as string)

        res.status(200).json({ token, user: { name: user.name, email: user.email, picture: user.picture } });
    } catch (error) {
        next(error);
    }
};