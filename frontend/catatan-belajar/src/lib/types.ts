export interface CatatanData {
  id_catatan?: number;
  judul: string;
  isi: string;
  isPublic: boolean;
  gambar: string;
  tag: string[];
}

export type MethodType = "POST" | "PUT" | "GET" | "DELETE"; 