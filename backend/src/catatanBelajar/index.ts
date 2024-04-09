import express from "express";
import prisma from "../prisma";

const router = express.Router();

router.get('/catatanBelajars', async (req, res) => {
    const catatanBelajars = await prisma.catatanbelajar.findMany();
    res.send(catatanBelajars);
});

router.get('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;
    const catatanBelajar = await prisma.catatanbelajar.findUnique({
        where: {
            id: parseInt(catatanId),
        },
    });

    if (!catatanBelajar) {
        return res.status(404).send({
            error: "Catatan Belajar not found"
        });
    }

    res.send(catatanBelajar);
});

router.get('/catatanBelajar', async (req, res) => {
    const keyword = req.query.keyword?.toString();
    const catatanBelajar = await prisma.catatanbelajar.findMany({
        where: {
            judul_catatan:{
                contains: keyword,
                mode: 'insensitive'
            }
        },
    });

    if (!catatanBelajar) {
        return res.status(404).send({
            error: "Catatan Belajar not found"
        });
    }

    res.send(catatanBelajar);
});

router.post('/catatanBelajar', async (req, res) => {
    const newCatatanData = req.body;

    const catatanBelajar = await prisma.catatanbelajar.create({
        data: {
            id_akun: newCatatanData.id_akun,
            judul_catatan: newCatatanData.judul_catatan,
            isi_catatan: newCatatanData.isi_catatan,
            privasi: newCatatanData.privasi,
            gambar: newCatatanData.gambar
        },
    });

    res.send({
        data: catatanBelajar,
        message: "Create Catatan Belajar successfully"
    });
});

router.put('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;
    const updateCatatanData = req.body;

    if (!(updateCatatanData.judul_catatan && updateCatatanData.isi_catatan && updateCatatanData.privasi)) {
        return res.status(400).send({
            error: "All fields are required"
        });
    }

    const catatanbelajar = await prisma.catatanbelajar.update({
        where: {
            id: parseInt(catatanId),
        },
        data: {
            judul_catatan: updateCatatanData.judul_catatan,
            isi_catatan: updateCatatanData.isi_catatan,
            privasi: updateCatatanData.privasi,
            gambar: updateCatatanData.gambar
        },
    });

    res.send({
        data: catatanbelajar,
        message: "Catatan Belajar Updated successfully"
    });
});

router.patch('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;
    const updateCatatanData = req.body;

    const catatanbelajar = await prisma.catatanbelajar.update({
        where: {
            id: parseInt(catatanId),
        },
        data: {
            judul_catatan: updateCatatanData.judul_catatan,
            isi_catatan: updateCatatanData.isi_catatan,
            privasi: updateCatatanData.privasi,
            gambar: updateCatatanData.gambar
        },
    });

    res.send({
        data: catatanbelajar,
        message: "Catatan Belajar Updated successfully"
    });
});

router.delete('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;

    await prisma.catatanbelajar.delete({
        where: {
            id: parseInt(catatanId),
        },
    });

    res.send("Catatan Belajar deleted successfully");
});

export default router;