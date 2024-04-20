import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar,
  AvatarFallback,
  AvatarImage, 
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const CardCatatan: React.FC = () => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-left text-lg font-bold">Create project</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name" className="text-left font-normal">Pokoknya ini buat deskripsi</Label>
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
        <Badge className="bg-[#F9A682] text-[#B23E19]">ini tag</Badge>
      </CardFooter>
    </Card>
  );
};

export default CardCatatan;
