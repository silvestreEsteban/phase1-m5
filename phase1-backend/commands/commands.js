#! /usr/bin/env node
import { Command } from "commander";
import Item from "./model.js";
import seedData from "../seedData/seed.js";
import { faker } from "@faker-js/faker";
const program = new Command();
import {
  addListing,
  findListing,
  updateListing,
  deleteListing,
  listAllListings,
} from "../index.js";

import inquirer from "inquirer";
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

program.version("1.0.0").description("CLI for managing listings");

// Add command
program
  .command("add")
  .alias("a")
  .description("Add a new listing")
  .action(() => {
    prompt(questions).then((answers) => {
      addListing(answers);
    });
  });

// Find command
program
  .command("find <title>")
  .alias("f")
  .description("Find a listing")
  .action((title) => {
    findListing(title);
  });

// Update command

program
  .command("update <_id>")
  .alias("u")
  .description("Update a listing")
  .action((_id) => {
    prompt(questions).then((answers) => {
      updateListing(_id, answers);
    });
  });

// Delete command
program
  .command("delete <_id>")
  .alias("d")
  .description("Delete a listing")
  .action((_id) => {
    deleteListing(_id);
  });

// List command
program
  .command("list")
  .alias("l")
  .description("List all listings")
  .action(() => {
    listAllListings();
  });

//   seed data
program
  .command("seed")
  .alias("s")
  .description("Seed the database with fake data")
  .action(seedData);

program.parse(process.argv);
