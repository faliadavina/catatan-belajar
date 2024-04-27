import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";

import { Button } from "../ui/button";

const AlertDialog = ({ isOpen, onClose, message }) => {
    return (
    <Dialog open={isOpen}>
        <DialogPortal>
          <DialogOverlay/>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {message?.judul}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {message?.deskripsi}
            </DialogDescription>
            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={onClose}>
                        Ok
                    </Button>
                </DialogClose>
            </DialogFooter>
          </DialogContent>        
        </DialogPortal>
    </Dialog>
    )
}

export default AlertDialog;