import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faFileArrowDown,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import { CatatanData, MethodType } from "@/lib/types";

const CardCatatan: React.FC<{
  catatan: CatatanData;
  toggleNotepad: (newMethod?: MethodType, newCatatanData?: CatatanData) => void;
}> = ({ catatan, toggleNotepad }) => {
  // Buat array tags yang berisi nama-nama tag dari catatan.catatanbelajar_tag
  const tags = catatan.nama_tag;

  return (
    <Card className="w-[300px]" onClick={() => toggleNotepad("GET", catatan)}>
      <CardHeader>
        <CardTitle className="text-left text-lg font-bold flex justify-between">
          {catatan.judul_catatan}
          {catatan.privasi === "PRIVATE" && (
            <FontAwesomeIcon icon={faLock} color="#38B0AB" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="name"
              className="text-left font-normal overflow-hidden h-[73px] leading-tight line-clamp-4"
            >
              {parse(catatan.isi_catatan)}
            </Label>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Label className="text-sm font-medium ml-2">Nama si User</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Badge className="bg-[#F9A682] text-[#B23E19] hover:bg-[#F9A682] hover:text-[#B23E19] rounded-md">
          ini tag
        </Badge> */}
        {tags && tags.map((tag, index) => (
          <Badge key={index} className="bg-[#F9A682] text-[#B23E19] hover:bg-[#F9A682] hover:text-[#B23E19] rounded-md">
            {tag}
          </Badge>
        ))}
        <div>
          <Button
            className="w-6 h-6 p-0 text-xs border-2 border-[#E7EAE9]"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleNotepad("PUT", catatan);
            }}
            
          >
            <FontAwesomeIcon icon={faPenToSquare} color="#38B0AB" />
          </Button>
          <Button
            className="mx-1 w-6 h-6 p-0 text-xs border-2 border-[#E7EAE9]"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faFileArrowDown} color="#38B0AB" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardCatatan;
