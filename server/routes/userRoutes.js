import express from 'express'
import { createUser, listUsers, loadUserById, updateUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js';

export const userRoute = express.Router()

userRoute.post('/users', createUser);
userRoute.get('/users', verifyToken, listUsers);
userRoute.get('/users/:userId', verifyToken, loadUserById);
userRoute.put('/users/:userId', verifyToken, updateUser);
userRoute.delete('/users/:userId', verifyToken, deleteUser);

