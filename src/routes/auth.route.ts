import express from 'express';
import { googleSignIn } from '../services/auth/auth.controller';
const router = express.Router()

router.post("/signin", googleSignIn as any)

export default router