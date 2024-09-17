#! /usr/bin/env node
import { Command } from "commander";
import Item from "./model.js";
import seedData from "../seedData/seed.js";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
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

const confirmDeletionPrompt = [
  {
    type: "confirm",
    name: "confirmation",
    message: "Are you sure you want to delete this listing?",
    default: false,
  },
];

program.version("1.0.0").description("CLI for managing listings");

// Add command
program
  .command("add")
  .alias("a")
  .description("Add a new listing")
  .option("-t, --title <title>", "Title of the listing")
  .option("-d, --description <description>", "Description of the listing")
  .option("-sp, --start_price <start_price>", "Start price of the listing")
  .option(
    "-rp, --reserve_price <reserve_price>",
    "Reserve price of the listing"
  )
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
  .option(
    "-t, --title <title>",
    "Title of the listing will bring back listing if it exists in this database"
  )
  .action((title) => {
    findListing(title);
  });

// Update command

program
  .command("update <_id>")
  .alias("u")
  .description("Update a listing by ID")
  .option("-i, --_id <_id>", "ID of the listing is required to update")
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
  .option(
    "-i, --_id <_id>",
    "ID of the listing to delete, will be asked for confirmation"
  )
  .action((_id) => {
    prompt(confirmDeletionPrompt).then((answers) => {
      if (answers.confirmation) {
        deleteListing(_id);
      } else {
        console.log("Deletion cancelled");
        mongoose.connection.close();
      }
    });
  });

// List command
program
  .command("list")
  .alias("l")
  .description("List all listings")
  .option("-a, --all", "List all listings that exist in the database")
  .action(() => {
    listAllListings();
  });

//   seed data
program
  .command("seed")
  .alias("s")
  .description("Seed the database with fake data")
  .option("-s, --seed", "Seed the database with fake data")
  .action(seedData);

program.parse(process.argv);
