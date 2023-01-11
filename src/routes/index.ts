import { Router } from "express";
import register from "../controllers/registerController";

const mainRouter = Router();

mainRouter.post('/register', register);
mainRouter.get('/ping', (req, res) => res.status(200).json({ ping: 'pong' }));

export default mainRouter;
