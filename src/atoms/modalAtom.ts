import { DocumentData } from "firebase/firestore";
import {atom} from 'recoil';
import { Movie } from "../../types";

export const ModalState = atom({
  key: 'modalState',
  default: {
    isOpen: false,
  }
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})