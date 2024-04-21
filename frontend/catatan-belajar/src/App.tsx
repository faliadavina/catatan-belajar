import { useEffect, useState } from 'react';
import './App.css'
import CardCatatan from './components/custom/CardCatatan';
import Notepad from './components/custom/Notepad';
import { Button } from './components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './components/ui/input';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function App() {
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);
  const [catatanBelajar, setCatatanBelajar] = useState<Catatan[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const toggleNotepad = () => {
    setIsNotepadOpen(!isNotepadOpen);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // Fungsi untuk melakukan pencarian
  const searchCatatan = async () => {
    try {
      const response = await axios.get<Catatan[]>(`http://localhost:3030/api/catatanbelajar?keyword=${searchKeyword}`);
      setCatatanBelajar(response.data);
    } catch (error) {
      console.error('Failed to search data:', error);
    }
  };

  interface Catatan {
    id: number;
    judul_catatan: string;
    isi_catatan: string;
    // tambahkan properti lain jika diperlukan
  }
  

  // Fungsi untuk melakukan fetch data, dengan parameter opsional keyword untuk pencarian
  const fetchData = async (keyword?: string) => {
    try {
      let url = 'http://localhost:3030/api/catatanbelajar';
      if (keyword) {
        url += `?keyword=${keyword}`;
      }
      const response = await axios.get<Catatan[]>(url);
      setCatatanBelajar(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

// Memanggil fetchData saat komponen pertama kali di-render
  useEffect(() => {
    fetchData();
  }, []);

// Memperbarui useEffect untuk melakukan fetch data saat searchKeyword berubah
  useEffect(() => {
    if (searchKeyword !== '') {
      fetchData(searchKeyword);
    } else {
      // Jika searchKeyword kosong, tampilkan semua catatan belajar
      fetchData();
    }
  }, [searchKeyword]);

  // Menampilkan catatan belajar
  let cards;
  if (catatanBelajar.length > 0) {
    cards = catatanBelajar.map((catatan) => (
      <div key={catatan.id} className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 pb-3">
        <CardCatatan judul={catatan.judul_catatan} isi={catatan.isi_catatan} />
      </div>
    ));
  } else {
    cards = <div className="text-center">Data not found</div>;
  }


  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-left">Catatan Belajar</h1>
      <div className="flex justify-between mt-12">
        <Button onClick={toggleNotepad} className="bg-[#38B0AB]">
          Tambah
        </Button>
        <div className="relative w-1/4">
          <Input type='search' placeholder="Search for catatan belajar..." className="rounded-xl pl-10" value={searchKeyword} onChange={handleSearchInputChange}/>
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

      </div>
      <div className="container mx-auto mt-4 rounded-xl bg-[#F5F7F9]">
        <div className="pt-2 pb-4 flex flex-wrap">
          {cards}
        </div>
      </div>
      <Notepad isOpen={isNotepadOpen} onClose={toggleNotepad} />
    </div>
  );
}

export default App;