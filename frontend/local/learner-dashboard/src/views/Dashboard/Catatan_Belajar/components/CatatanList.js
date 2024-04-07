import React from "react";
import { Flex } from "@chakra-ui/react";
import Catatan from "./Catatan";

const CatatanList = () => {
  // Data catatan untuk ditampilkan
  const data = [
    {
      id_catatan: 1,
      judul_catatan: 'Pengembangan Web',
      isi_catatan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac lacinia sapien, sed dictum metus. Suspendisse aliquet, tortor at euismod pharetra, eros dolor iaculis justo, et pulvinar orci massa et turpis. '
    },
    {
      id_catatan: 2,
      judul_catatan: 'Pengolahan Citra Digital',
      isi_catatan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac lacinia sapien, sed dictum metus. Suspendisse aliquet, tortor at euismod pharetra, eros dolor iaculis justo, et pulvinar orci massa et turpis. '
    },
    {
      id_catatan: 3,
      judul_catatan: 'Sistem Terdistribusi',
      isi_catatan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac lacinia sapien, sed dictum metus. Suspendisse aliquet, tortor at euismod pharetra, eros dolor iaculis justo, et pulvinar orci massa et turpis. '
    },
  ];

  return (
    <Flex justifyContent="space-between" padding="20px">
      {/* Menampilkan catatan pertama */}
      <Catatan
        judul_catatan={data[0].judul_catatan}
        isi_catatan={data[0].isi_catatan}
      />
      {/* Menampilkan catatan kedua */}
      <Catatan
        judul_catatan={data[1].judul_catatan}
        isi_catatan={data[1].isi_catatan}
      />
      {/* Menampilkan catatan ketiga */}
      <Catatan
        judul_catatan={data[2].judul_catatan}
        isi_catatan={data[2].isi_catatan}
      />
    </Flex>
  );
};

export default CatatanList;
