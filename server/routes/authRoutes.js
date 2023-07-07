import { signin, signout } from "../controllers/auth.controller.js";
import express from "express";

export const authRoute = express.Router ();

authRoute.post('/signin', signin);
authRoute.get('/singout', signout);