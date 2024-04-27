export interface CatatanData {
  id?: number;
  judul_catatan: string;
  isi_catatan: string;
  privasi: string;
  gambar: string;
  nama_tag: string[];
}

export type MethodType = "POST" | "PUT" | "GET" | "DELETE"; 