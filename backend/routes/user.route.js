// router.js

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const APP_ID =process.env.VITE_APP_ID;
const APP_KEY = process.env.VITE_APP_KEY;

const fetchRecipes = async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
    }

    const data = await response.json();
    res.json(data.hits); // Send the fetched recipes back as a response



    // res.json(data.hits.map(hit => hit.recipe)); // Send the fetched recipes back as a response
    // const recipes = data.hits.map(hit => hit.recipe); 
    // console.log(data.hits)// Send the fetched recipes back as a response
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};


router.get("/recipes/:searchQuery", fetchRecipes);

export default router;
