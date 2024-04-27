import { CatatanData } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import parse from "html-react-parser";
import { Badge } from "../ui/badge";

interface ViewCatatanProps {
  catatanData: CatatanData;
  onSubmit: (isSubmit: boolean) => void;
}

const ViewCatatan: React.FC<ViewCatatanProps> = ({ catatanData, onSubmit }) => {
  if (catatanData.isi_catatan.includes("ql-align-center")) {
    catatanData.isi_catatan = catatanData.isi_catatan.replace(/ql-align-center/g,"text-center");
  } else if (catatanData.isi_catatan.includes("ql-align-right")) {
    catatanData.isi_catatan = catatanData.isi_catatan.replace(/ql-align-right/g,"text-right");
  }

  return (
    <>
      <ScrollArea className="h-80 w-full border mt-4 flex items-center justify-start">
        {catatanData.gambar && (
          <div className="flex items-center justify-center w-full h-full">
            <img src={catatanData.gambar} className="w-full object-cover" />
          </div>
        )}
        <div className={`p-4 text-sm w-full text-left`}>
          {parse(catatanData.isi_catatan)}
        </div>
        
      </ScrollArea>
      <div className="flex justify-start mt-2">
        {catatanData.catatanbelajar_tag?.map(tag => (
          console.log(tag),
          <Badge key={tag.tag.nama_tag} className="bg-[#F9A682] text-[#B23E19] hover:bg-[#F9A682] hover:text-[#B23E19] rounded-md  mr-1">
            {tag.tag.nama_tag}
          </Badge>
        ))}
        </div>

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
