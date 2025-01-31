import { NextFunction, Request, Response } from 'express';
import { Url } from '../../models/url.model';
import { generateShortUid } from '../../utils/generateShortUid';


export const shortUrl = async (req: Request, res: Response, next: NextFunction) => {
    const { longUrl, customAlias, topic } = req.body;
    try {
        let shortUrl: string;
        if (customAlias) {
            const existingUrl = await Url.findOne({ shortUrl: customAlias });
            if (existingUrl) {
                return res.status(400).json({ error: "Custom alias already exists." });
            }
            shortUrl = customAlias;
        } else {
            shortUrl = generateShortUid();
            while (await Url.exists({ shortUrl })) {
                shortUrl = generateShortUid();
            }
        }


        const newUrl = new Url({
            longUrl,
            shortUrl,
            topic,
            user: req.user?.id
        });

        await newUrl.save();

        res.status(201).json({
            shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
            createdAt: newUrl.createdAt
        });
    } catch (error) {
        next(error);
    }
};