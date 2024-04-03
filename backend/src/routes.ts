import express from "express";
const router = express.Router();

import catatanBelajarRoute from "./catatanBelajar";

router.use("/catatanBelajar", catatanBelajarRoute);

export default router;  // Export router