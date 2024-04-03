const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello World');
});

app.get('/catatanBelajars', async (req, res) => {
    const catatanBelajars = await prisma.catatanbelajar.findMany();
    res.send(catatanBelajars);
});

app.get('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;
    const catatanBelajar = await prisma.catatanbelajar.findUnique({
        where: {
            id_catatan: parseInt(catatanId),
        },
    });

    if (!catatanBelajar) {
        return res.status(404).send({
            error: "Catatan Belajar not found"
        });
    }

    res.send(catatanBelajar);
});

app.post('/catatanBelajar', async (req, res) => {
    const newCatatanData = req.body;

    const catatanBelajar = await prisma.catatanbelajar.create({
        data: {
            id_tag: newCatatanData.id_tag,
            id_akun: newCatatanData.id_akun,
            judul_catatan: newCatatanData.judul_catatan,
            isi_catatan: newCatatanData.isi_catatan,
            privasi: newCatatanData.privasi
        },
    });

    res.send({
        data: catatanBelajar,
        message: "Create Catata Belajar successfully"
    });
});

app.put('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;
    const updateCatatanData = req.body;

    if (!(updateCatatanData.id_tag && updateCatatanData.id_akun && updateCatatanData.judul_catatan && updateCatatanData.isi_catatan && updateCatatanData.privasi)) {
        return res.status(400).send({
            error: "All fields are required"
        });
    }

    const catatanbelajar = await prisma.catatanbelajar.update({
        where: {
            id_catatan: parseInt(catatanId),
        },
        data: {
            id_tag: updateCatatanData.id_tag,
            id_akun: updateCatatanData.id_akun,
            judul_catatan: updateCatatanData.judul_catatan,
            isi_catatan: updateCatatanData.isi_catatan,
            privasi: updateCatatanData.privasi
        },
    });

    res.send({
        data: catatanbelajar,
        message: "Catatan Belajar Updated successfully"
    });
});

app.patch('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;
    const updateCatatanData = req.body;

    const catatanbelajar = await prisma.catatanbelajar.update({
        where: {
            id_catatan: parseInt(catatanId),
        },
        data: {
            id_tag: updateCatatanData.id_tag,
            id_akun: updateCatatanData.id_akun,
            judul_catatan: updateCatatanData.judul_catatan,
            isi_catatan: updateCatatanData.isi_catatan,
            privasi: updateCatatanData.privasi
        },
    });

    res.send({
        data: catatanbelajar,
        message: "Catatan Belajar Updated successfully"
    });
});

app.delete('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;

    await prisma.catatanbelajar.delete({
        where: {
            id_catatan: parseInt(catatanId),
        },
    });

    res.send("Catatan Belajar deleted successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});