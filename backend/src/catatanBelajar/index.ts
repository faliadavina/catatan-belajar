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

// router.post('/catatanBelajar', async (req, res) => {
//     const newCatatanData = req.body;

//     const catatanBelajar = await prisma.catatanbelajar.create({
//         data: {
//             id_akun: newCatatanData.id_akun,
//             judul_catatan: newCatatanData.judul_catatan,
//             isi_catatan: newCatatanData.isi_catatan,
//             privasi: newCatatanData.privasi,
//             gambar: newCatatanData.gambar
//         },
//     });

//     res.send({
//         data: catatanBelajar,
//         message: "Create Catatan Belajar successfully"
//     });
// });

router.post('/catatanBelajar', async (req, res) => {
    const newCatatanData = req.body;
    const tagNama = newCatatanData.nama_tag;

    let tagId;
    const existingTag = await prisma.tag.findUnique({
        where: {
            nama_tag: tagNama
        }
    });

    if (existingTag) {
        tagId = existingTag.id;
    } else {
        const newTag = await prisma.tag.create({
            data: {
                nama_tag: tagNama
            }
        });
        tagId = newTag.id;
    }

    const catatanBelajar = await prisma.catatanbelajar.create({
        data: {
            id_akun: newCatatanData.id_akun,
            judul_catatan: newCatatanData.judul_catatan,
            isi_catatan: newCatatanData.isi_catatan,
            privasi: newCatatanData.privasi,
            gambar: newCatatanData.gambar,
            catatanbelajar_tag: { // Gunakan nama relasi yang sesuai dengan tabel junction
            create: {
                tag: {
                    connect: {
                        id: tagId
                    }
                }
            }
        }
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
    const tagNama = updateCatatanData.nama_tag;

    let tagId;
    const existingTag = await prisma.tag.findUnique({
        where: {
            nama_tag: tagNama
        }
    });

    if (existingTag) {
        tagId = existingTag.id;
    } else {
        const newTag = await prisma.tag.create({
            data: {
                nama_tag: tagNama
            }
        });
        tagId = newTag.id;
    }

    // Hapus semua tag lama dari catatan belajar
    await prisma.catatanbelajar_tag.deleteMany({
        where: {
            id_catatanbelajar: parseInt(catatanId),
        },
    });

    // Tambahkan tag baru ke catatan belajar
    await prisma.catatanbelajar_tag.create({
        data: {
            id_catatanbelajar: parseInt(catatanId),
            id_tag: tagId
        }
    });

    const updatedCatatanBelajar = await prisma.catatanbelajar.update({
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
        data: updatedCatatanBelajar,
        message: "Catatan Belajar Updated successfully"
    });
});


router.delete('/catatanBelajar/:id', async (req, res) => {
    const catatanId = req.params.id;

    // Hapus relasi di tabel catatanbelajar_tag terlebih dahulu
    await prisma.catatanbelajar_tag.deleteMany({
        where: {
            id_catatanbelajar: parseInt(catatanId),
        },
    });

    // Hapus catatan belajar dari tabel catatanbelajar
    await prisma.catatanbelajar.delete({
        where: {
            id: parseInt(catatanId),
        },
    });

    res.send("Catatan Belajar deleted successfully");
});


export default router;