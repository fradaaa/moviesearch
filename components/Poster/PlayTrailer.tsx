"use client";

import { MovieInfo, VideoResult } from "@/types";
import { useEffect, useState } from "react";
import { LuPlay } from "react-icons/lu";
import ReactModal from "react-modal";
import PlayerModal from "../movie/PlayerModal";

type PlayerModalProps = {
  videos: VideoResult[];
  movieInfo: MovieInfo;
};

const PlayTrailer = ({ videos, movieInfo }: PlayerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    ReactModal.setAppElement("body");
  }, []);

  function openModal() {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }

  function closeModal() {
    document.body.style.overflow = "";
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="absolute -right-9 bottom-20 cursor-pointer rounded-sm bg-sky-600 p-4 text-4xl text-white"
        onClick={openModal}
      >
        <LuPlay aria-hidden="true" />
        <p className="sr-only">Play trailer</p>
      </button>
      {isOpen && (
        <ReactModal
          className="h-5/6 w-10/12 overflow-hidden rounded-lg bg-gray-900"
          overlayClassName="fixed w-full h-screen inset-0 z-[1000] flex justify-center items-center bg-black/80"
          contentLabel="Play Trailer Modal"
          isOpen={isOpen}
          onRequestClose={closeModal}
          shouldCloseOnEsc
          shouldCloseOnOverlayClick
        >
          <PlayerModal videos={videos} movieInfo={movieInfo} />
        </ReactModal>
      )}
    </>
  );
};

export default PlayTrailer;
