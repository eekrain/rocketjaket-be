import { Application, Request, Response } from "express";

const handler = (req: Request, res: Response) => {
  console.log("🚀 ~ file: hello.ts ~ line 4 ~ handler ~ req", req.body);
  // You can access ther request body at req.body
  return res.json({ hello: "world" });
};

module.exports = handler;
