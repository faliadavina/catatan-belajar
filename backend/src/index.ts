import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
export const port = 3030;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
