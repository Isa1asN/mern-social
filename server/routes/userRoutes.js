import express from 'express'
import { createUser, listUsers, loadUserById, updateUser, deleteUser } from '../controllers/user.controller.js'

export const userRoute = express.Router()

userRoute.post('/users', createUser);
userRoute.get('/users', listUsers);
userRoute.get('/users/:userId', loadUserById);
userRoute.put('/users/:userId', updateUser);
userRoute.delete('/users/:userId', deleteUser);

