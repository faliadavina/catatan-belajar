import React, { useRef, useEffect, useState } from "react";
import FormCatatan from "./FormCatatan";
import { ScrollArea } from "../ui/scroll-area";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faWindowMinimize,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { CatatanData, MethodType } from "@/lib/types";

interface NotepadProps {
  isOpen: boolean;
  onClose: () => void;
  method: MethodType;
  catatanData?: CatatanData;
  onRefresh: () => void;
}

const Notepad: React.FC<NotepadProps> = ({
  isOpen,
  onClose,
  method,
  catatanData,
  onRefresh,
}) => {
  const notepadRef = useRef<HTMLDivElement>(null);
 
  const [isMinimized, setIsMinimized] = useState(false);
  const [formCatatanData, setFormCatatanData] = useState<CatatanData>({
    judul_catatan: "",
    isi_catatan: "",
    privasi: "PRIVATE",
    gambar: "",
    nama_tag: [],
  });

  useEffect(() => {
    if (catatanData) {
      setFormCatatanData(catatanData);
    }
  }, [catatanData]);

  useEffect(() => {
    if (!isOpen)
      setFormCatatanData({
        judul_catatan: "",
        isi_catatan: "",
        privasi: "PRIVATE",
        gambar: "",
        nama_tag: [],
      });
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMinimized(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      notepadRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, isMinimized]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const updateCatatanData = (updatedData: Partial<CatatanData>) => {
    setFormCatatanData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleCatatanSubmit = async (isSubmit: boolean) => {
    if (isSubmit) {
      onClose()
    }
    onRefresh()
  };

  if (isOpen && !isMinimized) {
    return (
     
      <div
        ref={notepadRef}
        tabIndex={0}
        className="fixed bottom-0 right-0 mb-4 mr-4 overflow-y-auto shadow rounded-lg"
        style={{ maxHeight: "80vh" }}
      >

        <ScrollArea className="max-h-80vh">
          <div className="bg-white shadow rounded-lg max-w-lg w-full p-4 relative">
            {/* header */}
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold">Notepad</h4>
              <div>
                <button
                  id="minimize-btn"
                  className="p-1 rounded-full focus:outline-none"
                  onClick={toggleMinimize}
                >
                  <FontAwesomeIcon icon={faWindowMinimize} />
                </button>
                <button
                  className="p-1 rounded-full focus:outline-none"
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
            {/* content */}
            <FormCatatan
              catatanData={formCatatanData}
              onCatatanDataChange={updateCatatanData}
              onSubmit={handleCatatanSubmit}
              method={method}
            />
          </div>
        </ScrollArea>
      </div>
    );
  } else if (isMinimized) {
    return (
      <Button
        className="fixed bottom-0 right-0 mb-4 mr-4 p-3"
        onClick={toggleMinimize}
        variant="outline"
      >
        Notepad is minimized
        <FontAwesomeIcon icon={faCaretUp} className="ml-3" />
      </Button>
    );
  }
};

export default Notepad;
