import { addListing } from "../index.js";
import Conf from "conf";
import inquirer from "inquirer";
import { Command } from "commander";
const addProgram = new Command();

const prompt = inquirer.createPromptModule();
const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter the title of the listing",
  },
  {
    type: "input",
    name: "description",
    message: "Enter the description of the listing",
  },
  {
    type: "input",
    name: "start_price",
    message: "Enter the start price of the listing",
  },
  {
    type: "input",
    name: "reserve_price",
    message: "Enter the reserve price of the listing",
  },
];

const config = new Conf({
  projectName: "phase1-m5",
});

addProgram
  .command("add")
  .alias("a")
  .description("Add a new listing")
  .action(() => {
    prompt(questions).then((answers) => {
      addListing(answers);
    });
  });

export default addProgram;
