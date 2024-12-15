import express from "express";
import {
  createAstronaut,
  deleteAstronautById,
  getAstronautById,
  getAstronauts,
  getAstronautsByName,
  replaceAstronautById,
  updateAstronautById,
} from "../models/astronauts.js";

const router = express.Router();

export default router;
