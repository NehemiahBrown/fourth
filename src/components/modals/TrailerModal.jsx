import { X } from "lucide-react";

export default function TrailerModal({ trailerKey, title, closeModal }) {
  return (
    <div className="flex flex-col justify-center items-center gap-6 fixed inset-0 z-10000  bg-[var(--surface)]/70 backdrop-blur-sm">
      <X
        onClick={closeModal}
        className="self-end bg-[var(--accent-dark)] rounded-lg mr-4 md:mr-8 hover:bg-[var(--accent)] hover:text-[var(--accent-dark)] active:scale-95 transition-all duration-200 cursor-pointer"
        size={50}
      />

      <h1 className="text-4xl text-center">{title} Trailer</h1>

      <iframe
        className="border-none w-[90%] aspect-16/9 w-[90%] max-w-[900px]"
        src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
        title={`${title} trailer.`}
        allow="clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
