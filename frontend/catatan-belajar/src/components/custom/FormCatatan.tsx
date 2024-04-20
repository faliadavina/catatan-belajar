import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";

interface FormCatatanProps {
  onSubmit: (isSubmit: boolean) => void;
}

const FormCatatan: React.FC<FormCatatanProps> = ({ onSubmit }) => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [privasi, setPrivasi] = useState("PRIVATE");
  const [tag, setTag] = useState([""]);

  useEffect(() => {
    if (isPublic) {
      setPrivasi("PUBLIC");
    } else {
      setPrivasi("PRIVATE");
    }
  }, [isPublic]);

  const handleIsiChange = (value: string) => {
    setIsi(value);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3030/api/catatanbelajar/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_akun: 2,
            judul_catatan: judul,
            isi_catatan: isi,
            privasi: privasi,
            gambar: "",
            nama_tag: tag,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create thread");
      }

      onSubmit(true);
    } catch (error) {
      console.error("Error creating catatan:", error);
      alert("Failed to create thread. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Judul"
          onChange={(e) => setJudul(e.target.value)}
          value={judul}
        />

        {/* React Quill Editor */}
        <div>
          <ReactQuill
            value={isi}
            onChange={handleIsiChange}
            placeholder="Buat Catatan..."
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }],
                ["image"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "image",
              "color",
            ]}
          />
        </div>

        <Input
          type="text"
          placeholder="Tag"
          onChange={handleTagChange}
          value={tag}
        />
        <label
          htmlFor="tags"
          className="block text-sm text-gray-400 mt-1 ml-1 text-left"
          style={{ fontSize: "12px" }}
        >
          Pisahkan dengan koma (,) tanpa spasi sebelum/setelah koma tersebut
        </label>

        {/* Switch for Private Setting */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="private-setting" className="ml-2 cursor-pointer">
                Public
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            className={`bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md ${
              !isi.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isi.trim()}
          >
            Simpan
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormCatatan;
