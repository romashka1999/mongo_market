import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { AccountsController } from "./modules/accounts/accounts.controller";



const swaggerDoc = swaggerJsDoc({
    definition: {
        info: {
            version: '1.0.0',
            title: 'Online Market API',
            description: "online market description",
            contact: {
                name: "roma chikhladze"
            },
            
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ],
    },
    apis: ["app.ts"],
})

const app: Express = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
/**
 * @swagger
 * /customer
 *  put:
 *   description: roma
 */
app.use("/api/accounts", AccountsController)
export { app };

