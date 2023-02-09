import express from 'express';
import { createUserController } from '../../..';

const userRouter = express.Router();

userRouter.post('/create', (req, res) =>
  createUserController.execute(req, res),
);

userRouter.get('/', (req, res) => {
  return res.json({ message: 'Endpoint User' });
});

export { userRouter };
