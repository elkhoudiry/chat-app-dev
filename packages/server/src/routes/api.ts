import express from "express";
import controller from "../controllers/ping";

const router = express.Router();

router.get("/ping", controller.sampleHealthCheck);

router.get("/", (req, res, next) => res.status(404).json({ message: "not found!" }))

export = router;
