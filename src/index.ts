import Express, { NextFunction, Request, Response } from "express";
import mainRouter from "./routes";

const app = Express();

app.use(Express.json());
app.use(mainRouter);

app.listen('3333', () => console.log('listening on http://localhost:3333'));