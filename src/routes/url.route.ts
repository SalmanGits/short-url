import express from 'express';
import { shortUrl } from '../services/url/url.controller';
import { authenticate } from '../middleware/authenticate';
const router = express.Router()

router.post("/shorten",authenticate as any, shortUrl as any)

export default router