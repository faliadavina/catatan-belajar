import { useState } from 'react';
import './App.css'
import CardCatatan from './components/custom/CardCatatan';
import Notepad from './components/custom/Notepad';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';


function App() {
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);

  const toggleNotepad = () => {
    setIsNotepadOpen(!isNotepadOpen);
  };

  // Membuat array dengan jumlah elemen yang ditentukan
  const elements = Array.from({ length: 9 }, (_, i) => i + 1);

  // Membagi array menjadi array dengan 3 elemen per baris
  const chunks = (arr:number[], size:number) => {
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
          <CardCatatan/>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="App">
      <div className="flex justify-items-start">
        <Button onClick={toggleNotepad} className="bg-[#38B0AB]">
          Tambah
        </Button>
      </div>
      <div className="container mx-auto mt-4 rounded-xl bg-[#F5F7F9]">
        <div className="pt-2">
          {rows}
        </div>
      </div>
    </div>
  );
}

export default App
