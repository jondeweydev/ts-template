import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// __dirname TS replacement
const filename = fileURLToPath(import.meta.url);

// express constants
const app: express.Application = express();
const PORT: number | string = process.env.PORT || 3000;

// basic middleware
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

// serve static files
if (process.env.NODE_ENV?.trim() === "production") {
  app.use(express.static(path.join(path.dirname(filename), "../../build")));
} else {
  app.use(express.static(path.join(path.dirname(filename), "../client/")));
}

// routes here

// server start
app.listen(typeof PORT === "string" ? Number(PORT) : PORT, () =>
  console.log(`[Server] Started on port :${PORT}`)
);
