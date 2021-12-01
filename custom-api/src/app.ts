import express, { Request, response, Response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

const app = express();
app.use(bodyParser.json());
app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());
app.disable("x-powered-by");

app.post("/:route", (req: Request, res: Response) => {
  try {
    const handler = require(`./handlers/${req.params.route}`);
    if (!handler) {
      return res.status(404).json({
        message: `not found`,
      });
    }
    return handler(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: `unexpected error occured`,
    });
  }
});
export default app;
