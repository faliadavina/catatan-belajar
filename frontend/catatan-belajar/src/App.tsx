import { useState } from 'react';
import './App.css'
import CardCatatan from './components/custom/CardCatatan';
import Notepad from './components/custom/Notepad';
import { Button } from './components/ui/button';

function App() {
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);

  const toggleNotepad = () => {
    setIsNotepadOpen(!isNotepadOpen);
  };

  return (
    <div className="App">
      <Button onClick={toggleNotepad}>
        Tambah
      </Button>
      <Notepad isOpen={isNotepadOpen} onClose={toggleNotepad} />
    </div>
  );
}

export default App
