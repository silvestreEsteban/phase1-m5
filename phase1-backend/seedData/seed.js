import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Item from "../commands/model.js"; // Adjust the import path as necessary

const seed_count = 100; // Define the number of items to seed

const seedData = async () => {
  let timeSeriesData = [];

  // Create fake data
  for (let i = 0; i < seed_count; i++) {
    const title = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const start_price = faker.commerce.price();
    const reserve_price = faker.commerce.price();

    timeSeriesData.push({
      title,
      description,
      start_price,
      reserve_price,
    });
  }

  const seedDB = async () => {
    await Item.insertMany(timeSeriesData);
  };

  try {
    await seedDB();
    console.log("Seed data added");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();

export default seedData;
