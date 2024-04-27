import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";

import { Button } from "../ui/button";

const DialogKonfirmasi = ({ isOpen, onClose, onConfirm, judul, deskripsi, submitting }) => {
    return (
    <Dialog open={isOpen}>
        <DialogPortal>
          <DialogOverlay/>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {judul}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {deskripsi}
            </DialogDescription>
            <DialogFooter>
            <DialogClose asChild>
                <Button onClick={onClose}>
                Batal
                </Button>
            </DialogClose>
              <Button onClick={onConfirm} disabled={submitting}>
                Konfirmasi
              </Button>
            </DialogFooter>
          </DialogContent>        
        </DialogPortal>
    </Dialog>
    )
}

export default DialogKonfirmasi;