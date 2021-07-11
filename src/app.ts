import express, { Express } from "express";
import swagger from "swagger-ui-express";
import { AccountsController } from "./modules/accounts/accounts.controller";


const app: Express = express();

app.use("/docs", swagger.serve);
app.get("/docs", swagger.setup({}, { }));

app.use("/api/accounts", AccountsController)
export { app };

