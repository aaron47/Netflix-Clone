import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal"
import { useRecoilState } from "recoil"
import { ModalState } from "../atoms/modalAtom";


const Modal = () => {

  const [showModal, setShowModal] = useRecoilState(ModalState);

  const handleClose = () => {
    setShowModal({ isOpen: false });
  }

  return (
    <MuiModal open={showModal.isOpen} onClose={handleClose}>
      <>
        <button onClick={handleClose} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
          <XIcon className="h-6 w-6" />
        </button>
        <div>
          
        </div>
      </>
    </MuiModal>
  )
}

export default Modal