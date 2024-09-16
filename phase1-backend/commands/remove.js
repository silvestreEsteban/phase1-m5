import { deleteListing } from "../index.js";
import { Command } from "commander";
const removeProgram = new Command();

removeProgram
  .command("remove <_id>")
  .alias("r")
  .description("Remove a listing")
  .action((_id) => {
    deleteListing(_id);
  });

export default removeProgram;
