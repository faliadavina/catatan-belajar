import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { CatatanData, MethodType } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface FormCatatanProps {
  catatanData: CatatanData;
  onCatatanDataChange: (updatedData: Partial<CatatanData>) => void;
  onSubmit: (isSubmit: boolean) => void;
  method: MethodType;
}

const FormCatatan: React.FC<FormCatatanProps> = ({
  catatanData,
  onCatatanDataChange,
  onSubmit,
  method,
}) => {
  const { id_catatan, judul, isi, isPublic, gambar, tag } = catatanData;
  const [privasi, setPrivasi] = useState("PRIVATE");
  let data: any;

  const handleIsiChange = (value: string) => {
    onCatatanDataChange({ isi: value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCatatanDataChange({
      tag: e.target.value.split(",").map((tag) => tag.trim()),
    });
  };

  const handleMethodChange = (newMethod: MethodType) => {
    method = newMethod;
  };

  useEffect(() => {
    if (isPublic) {
      setPrivasi("PUBLIC");
    } else {
      setPrivasi("PRIVATE");
    }
  }, [isPublic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (method != "DELETE") {
        data = {
          id_akun: 2,
          judul_catatan: judul,
          isi_catatan: isi,
          privasi: privasi,
          gambar: gambar,
          nama_tag: tag,
        };
      }

      const response = await fetch(
        `http://localhost:3030/api/catatanbelajar/${id_catatan}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create or update catatan");
      }

      onSubmit(true);
    } catch (error) {
      console.error("Error creating or updating catatan:", error);
      alert("Failed to create or update catatan. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Judul"
          onChange={(e) => onCatatanDataChange({ judul: e.target.value })}
          value={judul}
        />

        <div>
          <ReactQuill
            value={isi}
            onChange={handleIsiChange}
            placeholder="Buat Catatan..."
            theme="snow"
            modules={{
              toolbar: [
                ["image"],
                [{ font: [] }],
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                [{ color: [] }],
                ["clean"],
              ],
            }}
            formats={[
              "font",
              "image",
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "align",
              "color",
            ]}
          />
        </div>

        <div className="text-left">
          <Label htmlFor="tag">Tag</Label>
          <Input
            type="text"
            placeholder="Tag"
            onChange={handleTagChange}
            value={tag}
            id="tag"
          />
          <label
            htmlFor="tags"
            className="block text-sm text-gray-400 mt-1 ml-1 text-left"
            style={{ fontSize: "12px" }}
          >
            Pisahkan dengan koma (,) tanpa spasi sebelum/setelah koma tersebut
          </label>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <Switch
                checked={isPublic}
                onCheckedChange={(checked) =>
                  onCatatanDataChange({ isPublic: checked })
                }
              />
              <Label htmlFor="private-setting" className="ml-2 cursor-pointer">
                Public
              </Label>
            </div>
          </div>

          <div>
            {method == "PUT" && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="px-3 hover:none focus:outline-none font-bold"
                        onClick={() => handleMethodChange("DELETE")}
                        variant="ghost"
                      >
                        <FontAwesomeIcon icon={faTrashCan} color="red" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hapus Catatan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            <Button
              type="submit"
              className={`bg-[#38B0AB] hover:bg-[#22918D] text-white px-4 py-2 rounded-md ml-2 ${
                !isi.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isi.trim()}
            >
              {method === "POST" ? "Simpan" : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormCatatan;
