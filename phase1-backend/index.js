#! /usr/bin/env node
import mongoose from "mongoose";
import Item from "./commands/model.js";
import seedData from "./seedData/seed.js";
import { Command } from "commander";
import { faker } from "@faker-js/faker";

mongoose.Promise = global.Promise;
const db = mongoose.connect("mongodb://127.0.0.1:27017/itemListings", {});
const program = new Command();
program.version("1.0.0");

const addListing = (listing) => {
  Item.create(listing).then((_listing) => {
    console.info("New listing added");
    mongoose.connection.close();
  });
};

const findListing = (title) => {
  const search = new RegExp(title, "i");
  Item.find({ $or: [{ title: search }] }).then((listing) => {
    console.info(listing);
    console.info(`${listing.length} matches`);
    mongoose.connection.close();
  });
};

const updateListing = (_id, listing) => {
  Item.findByIdAndUpdate({ _id }, listing).then((_listing) => {
    console.info("Listing updated");
    mongoose.connection.close();
  });
};

const deleteListing = (_id) => {
  Item.deleteOne({ _id }).then((_listing) => {
    console.info("Listing deleted");
    mongoose.connection.close();
  });
};

const listAllListings = () => {
  Item.find().then((listings) => {
    console.info(listings);
    console.info(`${listings.length} listings`);
    mongoose.connection.close();
  });
};

export {
  addListing,
  findListing,
  updateListing,
  deleteListing,
  listAllListings,
};
