import { useEffect, useState } from "react";
import "./App.css";
import CardCatatan from "./components/custom/CardCatatan";
import Notepad from "./components/custom/Notepad";
import { Button } from "./components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "./components/ui/input";
import { faPenToSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { CatatanData, MethodType } from "./lib/types";

function App() {
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [method, setMethod] = useState<MethodType>("POST");
  const [catatanBelajar, setCatatanBelajar] = useState<CatatanData[]>([]);
  const [catatanData, setCatatanData] = useState<CatatanData>();
  const catatanExample: CatatanData = {
    id: 20,
    judul_catatan: "Catatan Proyek 7",
    isi_catatan: "Proyek 3 kali ini menggunakan open edx sebagai teknologi yang akan digunakan serta diimplementasikan selama 1 semester kedepan",
    privasi: "PRIVATE",
    gambar:
      "https://assets.kompasiana.com/statics/crawl/552c0d1d6ea8344c398b4567.jpeg?t=o&v=740&x=416",
    nama_tag: ["Kimia", "Fisika Kuantum"],
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  
  useEffect(() => {
    fetchData(); // Fetch data tanpa keyword saat pertama kali render
  }, []);
  
  useEffect(() => {
    if (searchKeyword !== "") {
      searchCatatan(searchKeyword); // Panggil searchCatatan jika searchKeyword tidak kosong
    } else {
      fetchData(); // Panggil fetchData jika searchKeyword kosong
    }
  }, [searchKeyword]);
  
  // Fungsi untuk melakukan pencarian
  const searchCatatan = async (keyword: string) => {
    try {
      const response = await axios.get<CatatanData[]>(
        `http://localhost:3030/api/catatanBelajar?keyword=${keyword}`
      );
      setCatatanBelajar(response.data);
    } catch (error) {
      console.error("Failed to search data:", error);
    }
  };
  
  // Fungsi untuk melakukan fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get<CatatanData[]>(
        "http://localhost:3030/api/catatanBelajar/catatanBelajars"
      );
      setCatatanBelajar(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  

  // Menampilkan catatan belajar
  let cards;
  if (catatanBelajar.length > 0) {
    cards = catatanBelajar.map((catatan) => (
      <div
        key={catatan.id}
        className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 pb-3"
      >
        <CardCatatan catatan={catatan} toggleNotepad={toggleNotepad}/>
      </div>
    ));
  } else {
    cards = <div className="text-center">Data not found</div>;
  }

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-left">Catatan Belajar</h1>
      <div className="flex justify-between mt-12">
        <Button onClick={() => toggleNotepad("POST")} className="bg-[#38B0AB]">
          Tambah
        </Button>
        {/* coba update. nanti ganti buat per-data di card */}
        <Button
          onClick={() => toggleNotepad("PUT", catatanExample)}
          className="border-2 border-[#38B0AB]"
          variant="ghost"
        >
          <FontAwesomeIcon icon={faPenToSquare} color="#38B0AB" />
        </Button>
        <div className="relative w-1/4">
          <Input
            type="search"
            placeholder="Search for catatan belajar..."
            className="rounded-xl pl-10"
            value={searchKeyword}
            onChange={handleSearchInputChange}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div className="container mx-auto mt-4 rounded-xl bg-[#F5F7F9]">
        <div className="pt-4 pb-4 flex flex-wrap">{cards}</div>
        <Notepad
          isOpen={isNotepadOpen}
          onClose={toggleNotepad}
          method={method}
          catatanData={catatanData}
        />
      </div>
    </div>
  );
}

export default App;
