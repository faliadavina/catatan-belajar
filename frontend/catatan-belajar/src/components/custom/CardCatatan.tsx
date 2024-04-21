import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFileArrowDown, faLock } from "@fortawesome/free-solid-svg-icons";
import { PenSquare } from "lucide-react"
import parse from "html-react-parser";

const MAX_LENGTH = 100; // Jumlah maksimum karakter untuk ditampilkan

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  const truncatedText = text.slice(0, maxLength);
  return parse(truncatedText);
};

const CardCatatan: React.FC<{ judul: string; isi: string }> = ({ judul, isi }) => {
  const truncatedIsi = truncateText(isi, MAX_LENGTH);

  // Buat elemen placeholder untuk menjaga ukuran card tetap konstan
  const placeholder = Array.from({ length: MAX_LENGTH - isi.length }).map((_, index) => (
    <span key={index} className="invisible">x</span>
  ));

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-left text-lg font-bold flex justify-between">{judul}
          <FontAwesomeIcon icon={faLock} className="text-[#38B0AB]"/>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name" className="text-left font-normal overflow-hidden h-[50px]">{truncatedIsi}{placeholder}</Label>
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
        <Badge className="bg-[#F9A682] text-[#B23E19] hover:bg-[#F9A682] hover:text-[#B23E19] rounded-md">ini tag</Badge>
        <div>
            <Button
              className="w-6 h-6 p-0 text-xs border-2 border-[#E7EAE9]"
              variant="ghost"
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
