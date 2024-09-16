import { listAllListings } from "../index.js";
import { Command } from "commander";
const listProgram = new Command();

listProgram
  .command("list")
  .alias("l")
  .description("List all listings")
  .action(() => {
    listAllListings();
  });

export default listProgram;
