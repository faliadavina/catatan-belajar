import React, { useState } from "react";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface FormCatatanProps {
  onSubmit: (content: string, anonymous: boolean) => void;
}

const FormCatatan: React.FC<FormCatatanProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [contentLength, setContentLength] = useState(0);

  const handleContentChange = (value: string) => {
    setContent(value);
    setContentLength(value.replace(/(<([^>]+)>)/gi, "").length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content, isPublic);
    setContent("");
    setIsPublic(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-4">

        <input type="text" placeholder="Judul"/>

        {/* React Quill Editor */}
        <div>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            placeholder="Buat Catatan..."
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }, { background: [] }],
                ["link", "image"],
                ["code-block"],
                ["clean"],
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
              "link",
              "image",
              "color",
              "background",
              "code-block",
            ]}
          />
        </div>

        {/* Switch for Private Setting */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="private-setting" className="ml-2 cursor-pointer">Public</Label>
          </div>

          </div>
          <Button
            type="submit"
            className={`bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md ${
              !content.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!content.trim()}
          >
            Simpan
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormCatatan;
