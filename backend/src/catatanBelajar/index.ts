import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    res.send("Hello World This is test route");
//   const catatanBelajar = await prisma.catatanBelajar.findMany();
//   res.json(catatanBelajar);
});

router.get("/testdata", async (req, res) => {    
    // res.json(catatanBelajar);
    // const data = await prisma.tes.findMany();
    // res.json(data);
});

export default router;