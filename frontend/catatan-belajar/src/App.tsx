import { useState } from 'react';
import './App.css'
import Chat from './components/custom/Notepad'
import CardCatatan from './components/custom/CardCatatan';

function App() {
  const [isNotepadOpen, setIsNotepadOpen] = useState<boolean>(false);

  const toggleNotepad = () => {
    setIsNotepadOpen(!isNotepadOpen);
  };

  const elementsFrom = Array.from({ length: 40 }, (_, i) => (
    <CardCatatan/>
  ));

  return (
    <div className="App">
      <button onClick={toggleNotepad}>
        {isNotepadOpen ? 'Close' : 'Open'}
      </button>
      {isNotepadOpen && <Chat />}

      {elementsFrom}
    </div>
  );
}

export default App
