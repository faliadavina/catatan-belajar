import { useState } from "react";
import "./App.css";
import CardCatatan from "./components/custom/CardCatatan";
import Notepad from "./components/custom/Notepad";
import { Button } from "./components/ui/button";
import { CatatanData, MethodType } from "./lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);
  const [method, setMethod] = useState<MethodType>("POST");
  const [catatanData, setCatatanData] = useState<CatatanData>();
  const catatanExample: CatatanData = {
    id_catatan: 27,
    judul: "Catatan Proyek 7",
    isi: "Proyek 3 kali ini menggunakan open edx sebagai teknologi yang akan digunakan serta diimplementasikan selama 1 semester kedepan",
    isPublic: true,
    gambar:
      "https://assets.kompasiana.com/statics/crawl/552c0d1d6ea8344c398b4567.jpeg?t=o&v=740&x=416",
    tag: ["Kimia", "Fisika Kuantum"],
  };

  const toggleNotepad = (
    newMethod?: MethodType,
    newCatatanData?: CatatanData
  ) => {
    if (newMethod) setMethod(newMethod);

    if (newCatatanData) {
      setCatatanData(newCatatanData);
    } else {
      setCatatanData(undefined);
    }

    setIsNotepadOpen(!isNotepadOpen);
  };

  // Membuat array dengan jumlah elemen yang ditentukan
  const elements = Array.from({ length: 9 }, (_, i) => i + 1);

  // Membagi array menjadi array dengan 3 elemen per baris
  const chunks = (arr: number[], size: number) => {
    return arr.reduce<number[][]>((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

  // Mengelompokkan elemen menjadi array dengan 3 elemen per baris
  const groupedElements = chunks(elements, 3);

  // Menghasilkan CardCatatan untuk setiap baris
  const rows = groupedElements.map((row, index) => (
    <div key={index} className="flex justify-between mt-4">
      {row.map((element, index) => (
        <div key={index} className="w-1/3">
          <CardCatatan />
        </div>
      ))}
    </div>
  ));

  return (
    <div className="App">
      <div className="flex justify-items-start">
        <Button onClick={() => toggleNotepad("POST")} className="bg-[#38B0AB]">
          Tambah
        </Button>

        {/* coba update. nanti ganti buat per-data di card */}
        <Button
          onClick={() => toggleNotepad("PUT", catatanExample)}
          className="border-2 border-[#38B0AB]"
          variant="ghost"
        >
          <FontAwesomeIcon icon={faPenToSquare} color="#38B0AB"/>
        </Button>
      </div>
      <div className="container mx-auto mt-4 rounded-xl bg-[#F5F7F9]">
        <div className="pt-2">{rows}</div>
      </div>
      <Notepad
        isOpen={isNotepadOpen}
        onClose={toggleNotepad}
        method={method}
        catatanData={catatanData}
      />
    </div>
  );
}

export default App;
