import express from "express";
import controller from "../controllers/ping";

const router = express.Router();

router.get("/ping", controller.sampleHealthCheck);

export = router;
