import express from "express";
import prisma from "../prisma";
import PDFDocument from 'pdfkit';
import fs from "fs";

const router = express.Router();
const axios = require('axios');
const path = require('path');

router.get('/catatanBelajars', async (req, res) => {
    const catatanBelajars = await prisma.catatanbelajar.findMany({
        include: {
            catatanbelajar_tag: {
                    include: {
                        tag: {
                            select: { nama_tag: true } // Hanya memilih nama_tag
                        }
                    }
                }
        },
    });
    res.send(catatanBelajars);
});

router.get('/:id', async (req, res) => {
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

router.get('/', async (req, res) => {
    const keyword = req.query.keyword?.toString();

    // Mencari ID tag berdasarkan nama tag yang diberikan
    const tagIds = await prisma.tag.findMany({
        where: {
            nama_tag: {
                contains: keyword,
                mode: 'insensitive'
            }
        },
        select: {
            id: true
        }
    }).then(tags => tags.map(tag => tag.id));

    // Mencari catatan belajar yang memiliki tag dengan ID tersebut
    const catatanBelajar = await prisma.catatanbelajar.findMany({
        where: {
            OR: [
                {
                    judul_catatan: {
                        contains: keyword,
                        mode: 'insensitive'
                    }
                },
                {
                    catatanbelajar_tag: {
                        some: {
                          tag: {
                            id: {
                              in: tagIds
                            }
                          }
                        }
                      }
                }
            ]
        },
    });

    if (!catatanBelajar) {
        return res.status(404).send({
            error: "Catatan Belajar not found"
        });
    }

    res.send(catatanBelajar);
});

router.post('/', async (req, res) => {
    const newCatatanData = req.body;
    const tagNama = newCatatanData.nama_tag;

    let tagIds = [];
    for (const tagName of tagNama) {
        let tagId;
        const existingTag = await prisma.tag.findFirst({
            where: {
                nama_tag: {
                    equals: tagName,
                    mode: "insensitive" // Mode insensitive untuk mengabaikan perbedaan huruf besar kecil
                }
            }
        });

        if (existingTag) {
            tagId = existingTag.id;
        } else {
            const newTag = await prisma.tag.create({
                data: {
                    nama_tag: tagName
                }
            });
            tagId = newTag.id;
        }

        tagIds.push(tagId);
    }

    const catatanBelajar = await prisma.catatanbelajar.create({
        data: {
            id_akun: newCatatanData.id_akun,
            judul_catatan: newCatatanData.judul_catatan,
            isi_catatan: newCatatanData.isi_catatan,
            privasi: newCatatanData.privasi,
            gambar: newCatatanData.gambar,
            catatanbelajar_tag: { // Gunakan nama relasi yang sesuai dengan tabel junction
                create: tagIds.map(tagId => ({
                    tag: {
                        connect: {
                            id: tagId
                        }
                    }
                }))
            }
        },
    });

    res.send({
        data: catatanBelajar,
        message: "Create Catatan Belajar successfully"
    });
});

router.put('/:id', async (req, res) => {
    const catatanId = req.params.id;
    const updateCatatanData = req.body;

    if (updateCatatanData.nama_tag != undefined) {
        const tagNamas = updateCatatanData.nama_tag; // Ubah nama variabel agar sesuai dengan tipe data array

        // Inisialisasi array untuk menyimpan ID tag baru
        const newTagIds = [];

        // Proses setiap nama tag
        for (const tagNama of tagNamas) {
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

            // Tambahkan ID tag baru ke dalam array
            newTagIds.push(tagId);
        }

        // Hapus semua tag lama dari catatan belajar
        await prisma.catatanbelajar_tag.deleteMany({
            where: {
                id_catatanbelajar: parseInt(catatanId),
            },
        });

        // Tambahkan tag baru ke catatan belajar
        for (const tagId of newTagIds) {
            await prisma.catatanbelajar_tag.create({
                data: {
                    id_catatanbelajar: parseInt(catatanId),
                    id_tag: tagId
                }
            });
        }
    }

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


router.delete('/:id', async (req, res) => {
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

router.get('/catatanBelajar/:id/download', async (req, res) => {
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

    const pdfPath = path.resolve(__dirname, `../../public/downloads/catatan_belajar_${catatanId}.pdf`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    // Add text content to PDF
    doc.fontSize(20).text(`${catatanBelajar.judul_catatan}`, { align: 'center' });
    doc.fontSize(12).text(`${catatanBelajar.isi_catatan}`,{ align: 'left' , width: 500});

    // Get current vertical position
    const yPos = doc.y;

    // Download and add image to PDF
    const imagePath = `./public/tempImages/temp_image_${catatanId}.jpg`;
    const writer = fs.createWriteStream(imagePath);
    const response = await axios({
        url: catatanBelajar.gambar,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    writer.on('finish', () => {
        // Calculate x position to center the image
        const imageWidth = 200; // Adjust this value based on your image size
        const xPos = (doc.page.width - imageWidth) / 2;
        
        // Move to the calculated position
        doc.y = yPos + 20; // Add some padding
        doc.image(imagePath, xPos, doc.y, { width: imageWidth });

        doc.end();
        res.sendFile(pdfPath);
    });

    writer.on('error', (err) => {
        console.error('Failed to download image:', err);
        res.status(500).send('Failed to download image');
    });

});


export default router;