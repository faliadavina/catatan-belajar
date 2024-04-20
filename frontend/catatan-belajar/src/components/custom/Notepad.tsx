import React, { useRef, useEffect } from "react";
import FormCatatan from "./FormCatatan";
import { ScrollArea } from "../ui/scroll-area";

interface NotepadProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notepad: React.FC<NotepadProps> = ({ isOpen, onClose }) => {
  const notepadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      notepadRef.current?.focus();
      // Mengatur overflow pada latar belakang untuk mencegah scroll
      document.body.style.overflow = "hidden";
    } else {
      // Mengembalikan overflow pada latar belakang menjadi normal saat Notepad ditutup
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleCatatanSubmit = async (isSubmit: boolean) => {
    if (isSubmit) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          ref={notepadRef}
          tabIndex={0}
          className="fixed bottom-0 right-0 mb-4 mr-4 overflow-y-auto shadow-md"
          style={{ maxHeight: "80vh" }}
        >
          <ScrollArea className="max-h-80vh">
            <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-4">
              <FormCatatan onSubmit={handleCatatanSubmit} />
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default Notepad;
