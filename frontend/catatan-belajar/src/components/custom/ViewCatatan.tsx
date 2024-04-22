import { CatatanData } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import parse from "html-react-parser";

interface ViewCatatanProps {
  catatanData: CatatanData;
  onSubmit: (isSubmit: boolean) => void;
}

const ViewCatatan: React.FC<ViewCatatanProps> = ({ catatanData, onSubmit }) => {
    let textAlign = "left";

  if (catatanData.isi_catatan.includes("ql-align-center")) {
    textAlign = "center";
  } else if (catatanData.isi_catatan.includes("ql-align-right")) {
    textAlign = "right";
  }
  return (
    <>
      <ScrollArea className="h-80 w-full border mt-4 flex items-center justify-start">
        {catatanData.gambar && (
          <div className="flex items-center justify-center w-full h-full">
            <img src={catatanData.gambar} className="w-full object-cover" />
          </div>
        )}
        <div className={`p-4 text-sm w-full text-${textAlign}`}>
          {parse(catatanData.isi_catatan)}
        </div>
        
      </ScrollArea>

      <div className="flex items-center justify-end mt-4">
        <Button
          onClick={() => onSubmit(true)}
          className={`bg-[#38B0AB] hover:bg-[#22918D] text-white ml-2`}
        >
          Close
        </Button>
      </div>
    </>
  );
};

export default ViewCatatan;
