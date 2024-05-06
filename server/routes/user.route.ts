import express from "express";
import { Router } from "express";
import { getApi, getUser, signout } from "../controllers/user.controller";

const router = Router()

router.get('/', getApi)
router.get('/getUser', getUser)
router.post('/signout', signout)

export default router;