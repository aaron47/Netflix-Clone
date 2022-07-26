import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal"
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil"
import { Genre } from "../../types";
import { ModalState, movieState } from "../atoms/modalAtom";
import type {Element} from "../../types";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";


const Modal = () => {

  const [showModal, setShowModal] = useRecoilState(ModalState);
  const movie = useRecoilValue(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  const handleClose = () => {
    setShowModal({ isOpen: false });
  }

  useEffect(() => {
    if (!movie) return;

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())

      if (data?.videos) {
        const index = data.videos.results.findIndex((el: Element) => el.type === "Trailer");
        setTrailer(data.videos.results[index]?.key);
      }

      if (data?.genre) {
        setGenres(data.genres);
      }

    }
    fetchMovie();
  }, [movie])

  return (
    <MuiModal 
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      open={showModal.isOpen} 
      onClose={handleClose}
    >
      <>
        <button onClick={handleClose} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer 
            url={`https://youtube.com/watch?v=${trailer}`} 
            width="100%"
            height="100%"
            style={{position: 'absolute', top: '0', left: '0'}}
            playing
            muted={muted}
            />
            <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
              <div className="flex space-x-2">
                <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                  <FaPlay className="h-7 w-7 text-black "/>
                  Play
                </button>

                <button className="modalButton transition hover:bg-transparent">
                  <PlusIcon className="h-7 w-7"/>
                </button>

                <button className="modalButton transition hover:bg-transparent">
                  <ThumbUpIcon className="h-7 w-7"/>
                </button>
              </div>
                <button 
                  onClick={() => setMuted(!muted)}
                  className="modalButton transition hover:bg-transparent"
                >
                  {muted ? <VolumeOffIcon className="h-7 w-7"/> : <VolumeUpIcon className="h-7 w-7"/>}
                </button>
            </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal