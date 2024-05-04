import express from "express";
import { Router } from "express";
import { getApi, signout } from "../controllers/user.controller";

const router = Router()

router.get('/', getApi)
router.post('/signout', signout)

export default router;