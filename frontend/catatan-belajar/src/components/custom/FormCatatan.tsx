import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { CatatanData, MethodType } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import DialogKonfirmasi from "./DialogKonfirmasi";
import AlertDialog from "./AlertDialog";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState({judul: '', deskripsi: ''})

  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  }

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  }

  const handleOpenAlert = () => {
    setOpenAlert(true);
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const { id: id_catatan, judul_catatan, isi_catatan, privasi, gambar, nama_tag } =
    catatanData;
  const [isPrivasi, setIsPrivasi] = useState(privasi == "PUBLIC");
  let data: any;

  const handleIsiChange = (value: string) => {
    onCatatanDataChange({ isi_catatan: value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCatatanDataChange({
      nama_tag: e.target.value.split(",").map((nama_tag) => nama_tag.trim()),
    });
  };

  const handlePrivasiChange = () => {
    setIsPrivasi((prevIsPrivasi) => !prevIsPrivasi);
    const newPrivasi = isPrivasi ? "PUBLIC" : "PRIVATE";
    onCatatanDataChange({ privasi: newPrivasi });
  };

  const handleMethodChange = (newMethod: MethodType) => {
    method = newMethod;
  };

  const handleDelete = async (e : React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      data = {
        id_akun: 2,
        judul_catatan: judul_catatan,
        isi_catatan: isi_catatan,
        privasi: privasi,
        gambar: gambar,
        nama_tag: [],
      };

      const response = await fetch(
        `http://localhost:3030/api/catatanbelajar/${id_catatan?id_catatan:""}`,
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
      
      setAlertMessage({
        judul : 'Berhasil!',
        deskripsi : 'Berhasil Menghapus Pesan!' 
      })
      
      handleOpenAlert()

      setSubmitting(false)

    } catch (error) {
      console.error("Error creating or updating catatan:", error);
      setAlertMessage({
        judul : 'Gagal!',
        deskripsi : 'Terjadi Kesalahan!, Gagal Menghapus Pesan!' 
      })
      handleOpenAlert()
      alert("Failed to create or update catatan. Please try again.");
      setSubmitting(false)
    }

      onSubmit(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true)
      if (method != "DELETE") {
        data = {
          id_akun: 2,
          judul_catatan: judul_catatan,
          isi_catatan: isi_catatan,
          privasi: privasi,
          gambar: gambar,
          nama_tag: [],
        };
      }

      const response = await fetch(
        `http://localhost:3030/api/catatanbelajar/${id_catatan?id_catatan:""}`,
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

      setAlertMessage({
        judul : 'Berhasil!',
        deskripsi : 'Berhasil Menghapus Pesan!' 
      })
      handleOpenAlert()
      setSubmitting(false)
    } catch (error) {
      console.error("Error creating or updating catatan:", error);
      alert("Failed to create or update catatan. Please try again.");
      setAlertMessage({
        judul : 'Gagal!',
        deskripsi : 'Terjadi Kesalahan!, Gagal Menghapus Pesan!' 
      })
      handleOpenAlert()
      setSubmitting(false)
    }

    onSubmit(true);
  };

  return (
    <>

    <AlertDialog isOpen={openAlert} onClose={handleCloseAlert} message={alertMessage}/>

    {/* <Button onClick={handleOpenAlert}>test</Button> */}

    <DialogKonfirmasi isOpen={openDialog} onClose={handleCloseDialog} onConfirm={handleSubmit} 
      deskripsi={`Apakah anda yakin ingin ${method == "POST"? "menyimpan" : "memperbarui"} catatan?`} 
      judul={method == "POST" ? "Simpan Data" : "Perbarui Catatan"}
      submitting={submitting}
    />

    <DialogKonfirmasi
      isOpen={openDeleteConfirm}
      onClose={handleCloseDeleteConfirm}
      onConfirm={handleDelete}
      deskripsi={`Apakah anda yakin ingin menghapus catatan?`}
      submitting={submitting}
    />
    <form className="mt-4">
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="judul_catatan"
          onChange={(e) =>
            onCatatanDataChange({ judul_catatan: e.target.value })
          }
          value={judul_catatan}
          required
        />

        <div>
          <ReactQuill
            value={isi_catatan}
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
          <Label htmlFor="nama_tag">nama_tag</Label>
          <Input
            type="text"
            placeholder="nama_tag"
            onChange={handleTagChange}
            value={nama_tag}
            id="nama_tag"
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
                checked={isPrivasi}
                onCheckedChange={handlePrivasiChange}
              />
              <Label htmlFor="private-setting" className="ml-2 cursor-pointer">
                Public
              </Label>
            </div>
          </div>

          <div>
            {method == "PUT" && (
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="px-3 hover:none focus:outline-none font-bold border-2 border-red-600"
                      onClick={() =>{ 
                        handleOpenDeleteConfirm();
                      }}
                      variant="ghost"
                      type="button"
                    >
                      <FontAwesomeIcon icon={faTrashCan} color="red" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hapus Catatan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
            )}

            <Button
              onClick={handleOpenDialog}
              type="button"
              className={`bg-[#38B0AB] hover:bg-[#22918D] text-white ml-2 ${
                !isi_catatan.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isi_catatan.trim()}
            >
              {method === "POST" ? "Simpan" : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default FormCatatan;
