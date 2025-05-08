import { Server } from "http";
import app from "./app";
import config from "./app/config";

const port = 3000;

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log("Sever is running on port ", config.port);
  });
}

main();
