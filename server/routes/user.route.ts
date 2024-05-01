import express from "express";
import { Router } from "express";
import { getApi } from "../controllers/user.controller";

const router = Router()

router.get('/', getApi)

export default router;