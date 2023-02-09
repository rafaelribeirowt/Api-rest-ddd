import express from 'express';
import { userRouter } from '../../../../modules/user/infra/http/routes/';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: 'ok' });
});

v1Router.use('/users', userRouter);

export { v1Router };